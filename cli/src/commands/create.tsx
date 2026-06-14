import { useState, useEffect, useRef } from 'react';
import { Box, Text, useApp } from 'ink';
import { TextInput, ConfirmInput, Select, Spinner, StatusMessage } from '@inkjs/ui';
import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'node:path';

const UPSTREAM = 'https://github.com/sookcha/xebon';

type Step = 'name' | 'title' | 'lang' | 'confirm' | 'running' | 'done' | 'error';
type TaskStatus = 'pending' | 'running' | 'done' | 'error';

interface Tasks {
  clone: TaskStatus;
  configure: TaskStatus;
  gitInit: TaskStatus;
  install: TaskStatus;
}

interface Props {
  initialName?: string;
}

export function CreateCommand({ initialName }: Props) {
  const { exit } = useApp();
  const [step, setStep] = useState<Step>(initialName ? 'title' : 'name');
  const [projectName, setProjectName] = useState(initialName ?? '');
  const [siteTitle, setSiteTitle] = useState('');
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [tasks, setTasks] = useState<Tasks>({
    clone: 'pending',
    configure: 'pending',
    gitInit: 'pending',
    install: 'pending',
  });
  const [error, setError] = useState<string | null>(null);
  const running = useRef(false);

  useEffect(() => {
    if (step !== 'running' || running.current) return;
    running.current = true;

    const targetDir = path.resolve(process.cwd(), projectName);

    (async () => {
      try {
        // Clone
        setTask('clone', 'running');
        if (await fs.pathExists(targetDir)) {
          throw new Error(`Directory "${projectName}" already exists.`);
        }
        await execa('git', ['clone', '--depth=1', UPSTREAM, projectName]);
        setTask('clone', 'done');

        // Configure
        setTask('configure', 'running');
        await configureSite(targetDir, siteTitle || projectName, lang, projectName);
        setTask('configure', 'done');

        // Git init
        setTask('gitInit', 'running');
        await fs.remove(path.join(targetDir, '.git'));
        await execa('git', ['init'], { cwd: targetDir });
        await execa('git', ['add', '-A'], { cwd: targetDir });
        await execa('git', ['commit', '-m', 'Initial commit from xebon'], {
          cwd: targetDir,
        });
        setTask('gitInit', 'done');

        // Install
        setTask('install', 'running');
        await execa('npm', ['install'], { cwd: targetDir });
        setTask('install', 'done');

        setStep('done');
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
        setStep('error');
      }
    })();
  }, [step]);

  useEffect(() => {
    if (step === 'done' || step === 'error') {
      const t = setTimeout(() => exit(), 300);
      return () => clearTimeout(t);
    }
  }, [step, exit]);

  function setTask(key: keyof Tasks, status: TaskStatus) {
    setTasks(prev => ({ ...prev, [key]: status }));
  }

  const header = (
    <Text bold color="cyan">
      xebon blog scaffold
    </Text>
  );

  if (step === 'name') {
    return (
      <Box flexDirection="column" gap={1}>
        {header}
        <Box>
          <Text>Project name: </Text>
          <TextInput
            placeholder="my-blog"
            onSubmit={value => {
              const v = value.trim();
              if (!v) return;
              setProjectName(v);
              setStep('title');
            }}
          />
        </Box>
      </Box>
    );
  }

  if (step === 'title') {
    return (
      <Box flexDirection="column" gap={1}>
        {header}
        <Text dimColor>
          Project: <Text color="white">{projectName}</Text>
        </Text>
        <Box>
          <Text>Site title </Text>
          <Text dimColor>(leave blank to use project name)</Text>
          <Text>: </Text>
          <TextInput
            placeholder={projectName}
            onSubmit={value => {
              setSiteTitle(value.trim() || projectName);
              setStep('lang');
            }}
          />
        </Box>
      </Box>
    );
  }

  if (step === 'lang') {
    return (
      <Box flexDirection="column" gap={1}>
        {header}
        <Text dimColor>
          Project: <Text color="white">{projectName}</Text>
        </Text>
        <Text>Default language:</Text>
        <Select
          options={[
            { label: 'Korean (ko)', value: 'ko' },
            { label: 'English (en)', value: 'en' },
          ]}
          onChange={value => {
            setLang(value as 'ko' | 'en');
            setStep('confirm');
          }}
        />
      </Box>
    );
  }

  if (step === 'confirm') {
    return (
      <Box flexDirection="column" gap={1}>
        {header}
        <Box flexDirection="column" borderStyle="round" borderColor="gray" paddingX={1}>
          <Text>
            {'  '}Directory:{' '}
            <Text color="yellow">{projectName}</Text>
          </Text>
          <Text>
            {'  '}Title:    {' '}
            <Text color="yellow">{siteTitle}</Text>
          </Text>
          <Text>
            {'  '}Language:{' '}
            <Text color="yellow">{lang}</Text>
          </Text>
          <Text>
            {'  '}Upstream:{' '}
            <Text color="yellow">{UPSTREAM}</Text>
          </Text>
        </Box>
        <Box>
          <Text>Create project? </Text>
          <ConfirmInput
            onConfirm={() => setStep('running')}
            onCancel={() => exit()}
          />
        </Box>
      </Box>
    );
  }

  if (step === 'running') {
    return (
      <Box flexDirection="column" gap={1}>
        <Text bold color="cyan">
          Creating {projectName}...
        </Text>
        <TaskLine status={tasks.clone} label="Clone template" />
        <TaskLine status={tasks.configure} label="Configure site" />
        <TaskLine status={tasks.gitInit} label="Initialize git" />
        <TaskLine status={tasks.install} label="Install dependencies" />
      </Box>
    );
  }

  if (step === 'done') {
    return (
      <Box flexDirection="column" gap={1}>
        <StatusMessage variant="success">
          Created <Text bold>{projectName}</Text>
        </StatusMessage>
        <Box flexDirection="column" marginLeft={2}>
          <Text dimColor>Next steps:</Text>
          <Text color="white">  cd {projectName}</Text>
          <Text color="white">  npm run dev</Text>
        </Box>
      </Box>
    );
  }

  if (step === 'error') {
    return (
      <Box flexDirection="column" gap={1}>
        <StatusMessage variant="error">Failed to create project</StatusMessage>
        {error && <Text dimColor>{error}</Text>}
      </Box>
    );
  }

  return null;
}

function TaskLine({ status, label }: { status: TaskStatus; label: string }) {
  if (status === 'pending') return <Text dimColor>  ○ {label}</Text>;
  if (status === 'running') return <Spinner label={` ${label}`} />;
  if (status === 'done') return <Text color="green">  ✓ {label}</Text>;
  return <Text color="red">  ✗ {label}</Text>;
}

async function configureSite(
  targetDir: string,
  siteTitle: string,
  lang: string,
  projectName: string,
) {
  // Update src/site.config.ts
  const configPath = path.join(targetDir, 'src', 'site.config.ts');
  let config = await fs.readFile(configPath, 'utf-8');
  config = config.replace(/title: '[^']*'/, `title: '${siteTitle}'`);
  config = config.replace(/lang: '(ko|en)' as Lang/, `lang: '${lang}' as Lang`);
  await fs.writeFile(configPath, config);

  // Update package.json name
  const pkgPath = path.join(targetDir, 'package.json');
  const pkg = await fs.readJson(pkgPath);
  pkg.name = projectName;
  await fs.writeJson(pkgPath, pkg, { spaces: 2 });

  // Write .xebon.json to track upstream
  await fs.writeJson(
    path.join(targetDir, '.xebon.json'),
    {
      upstream: UPSTREAM,
      createdAt: new Date().toISOString(),
    },
    { spaces: 2 },
  );
}
