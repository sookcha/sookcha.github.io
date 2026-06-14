import { useState, useEffect, useRef } from 'react';
import { Box, Text, useApp } from 'ink';
import { ConfirmInput, Spinner, StatusMessage } from '@inkjs/ui';
import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'node:path';
import os from 'node:os';

// Framework files synced from upstream on update
const SYNC_PATHS = [
  'src/themes/default',
  'src/i18n',
  'src/lib',
  'src/pages',
  'src/env.d.ts',
  'src/content.config.ts',
  'tsconfig.json',
  'package.json',
];

interface XebonConfig {
  upstream: string;
  createdAt: string;
  lastSynced?: string;
  syncedAt?: string;
}

type Step = 'checking' | 'confirm' | 'syncing' | 'done' | 'error' | 'not_xebon';

export function UpdateCommand() {
  const { exit } = useApp();
  const [step, setStep] = useState<Step>('checking');
  const [config, setConfig] = useState<XebonConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [synced, setSynced] = useState<string[]>([]);
  const [newCommit, setNewCommit] = useState<string>('');
  const running = useRef(false);

  // Check for .xebon.json on mount
  useEffect(() => {
    (async () => {
      try {
        const configPath = path.join(process.cwd(), '.xebon.json');
        if (!(await fs.pathExists(configPath))) {
          setStep('not_xebon');
          return;
        }
        const cfg = (await fs.readJson(configPath)) as XebonConfig;
        setConfig(cfg);
        setStep('confirm');
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
        setStep('error');
      }
    })();
  }, []);

  // Run sync when step becomes 'syncing'
  useEffect(() => {
    if (step !== 'syncing' || !config || running.current) return;
    running.current = true;

    const tmpDir = path.join(os.tmpdir(), `xebon-update-${Date.now()}`);

    (async () => {
      try {
        await execa('git', ['clone', '--depth=1', config.upstream, tmpDir]);

        const { stdout } = await execa('git', ['rev-parse', 'HEAD'], { cwd: tmpDir });
        const commitHash = stdout.trim();
        setNewCommit(commitHash);

        const syncedPaths: string[] = [];
        for (const p of SYNC_PATHS) {
          const src = path.join(tmpDir, p);
          const dest = path.join(process.cwd(), p);
          if (await fs.pathExists(src)) {
            await fs.copy(src, dest, { overwrite: true });
            syncedPaths.push(p);
          }
        }
        setSynced(syncedPaths);

        // Update .xebon.json
        await fs.writeJson(
          path.join(process.cwd(), '.xebon.json'),
          {
            ...config,
            lastSynced: commitHash,
            syncedAt: new Date().toISOString(),
          },
          { spaces: 2 },
        );

        setStep('done');
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
        setStep('error');
      } finally {
        await fs.remove(tmpDir).catch(() => {});
      }
    })();
  }, [step]);

  useEffect(() => {
    if (step === 'done' || step === 'error' || step === 'not_xebon') {
      const t = setTimeout(() => exit(), 300);
      return () => clearTimeout(t);
    }
  }, [step, exit]);

  if (step === 'checking') {
    return <Spinner label=" Checking project..." />;
  }

  if (step === 'not_xebon') {
    return (
      <StatusMessage variant="error">
        Not an xebon project (missing .xebon.json). Run{' '}
        <Text bold>xebon create</Text> to scaffold a new project.
      </StatusMessage>
    );
  }

  if (step === 'confirm' && config) {
    return (
      <Box flexDirection="column" gap={1}>
        <Text bold color="cyan">
          xebon update
        </Text>
        <Box flexDirection="column" borderStyle="round" borderColor="gray" paddingX={1}>
          <Text>
            {'  '}Upstream:{' '}
            <Text color="yellow">{config.upstream}</Text>
          </Text>
          {config.lastSynced ? (
            <Text>
              {'  '}Last synced:{' '}
              <Text color="yellow">{config.lastSynced.slice(0, 8)}</Text>
            </Text>
          ) : (
            <Text>
              {'  '}Last synced: <Text dimColor>never</Text>
            </Text>
          )}
        </Box>
        <Box flexDirection="column">
          <Text dimColor>Paths to sync:</Text>
          {SYNC_PATHS.map(p => (
            <Text key={p} dimColor>
              {'  '}{p}
            </Text>
          ))}
        </Box>
        <Text dimColor>
          Your content, site config, custom themes, and astro.config.ts will not be touched.
        </Text>
        <Box>
          <Text>Sync with upstream? </Text>
          <ConfirmInput onConfirm={() => setStep('syncing')} onCancel={() => exit()} />
        </Box>
      </Box>
    );
  }

  if (step === 'syncing') {
    return <Spinner label=" Syncing from upstream..." />;
  }

  if (step === 'done') {
    return (
      <Box flexDirection="column" gap={1}>
        <StatusMessage variant="success">
          Synced to <Text bold>{newCommit.slice(0, 8)}</Text>
        </StatusMessage>
        <Box flexDirection="column" marginLeft={2}>
          <Text dimColor>Updated:</Text>
          {synced.map(p => (
            <Text key={p} color="green">
              {'  '}✓ {p}
            </Text>
          ))}
          <Box marginTop={1}>
            <Text dimColor>Run </Text>
            <Text color="white">npm install</Text>
            <Text dimColor> if dependencies changed.</Text>
          </Box>
        </Box>
      </Box>
    );
  }

  if (step === 'error') {
    return (
      <Box flexDirection="column" gap={1}>
        <StatusMessage variant="error">Update failed</StatusMessage>
        {error && <Text dimColor>{error}</Text>}
      </Box>
    );
  }

  return null;
}
