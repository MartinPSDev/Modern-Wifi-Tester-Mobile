import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-nativescript';
import { FrameNavigationProp } from 'react-nativescript-navigation';
import { MainStackParamList } from '../NavigationParamList';

type PasswordTesterProps = {
  navigation: FrameNavigationProp<MainStackParamList, 'Password Tester'>;
  route: {
    params: {
      dictionary: string[];
    };
  };
};

export function PasswordTester({ route }: PasswordTesterProps) {
  const [ssid, setSsid] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPassword, setCurrentPassword] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const startTesting = () => {
    if (!ssid) {
      alert('Please enter a network SSID');
      return;
    }

    setIsTesting(true);
    setProgress(0);
    setLogs([]);

    // Simulate password testing
    const testPasswords = async () => {
      const { dictionary } = route.params;
      for (let i = 0; i < dictionary.length; i++) {
        if (!isTesting) break;

        const password = dictionary[i];
        setCurrentPassword(password);
        setProgress((i + 1) / dictionary.length);
        setLogs((prev) => [...prev, `Testing password: ${password}`]);

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setIsTesting(false);
    };

    testPasswords();
  };

  const stopTesting = () => {
    setIsTesting(false);
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-2xl font-bold mb-4">Password Tester</label>

      <flexboxLayout style={styles.inputContainer}>
        <textField
          hint="Network SSID"
          text={ssid}
          onTextChange={(e) => setSsid(e.value)}
          style={styles.input}
          editable={!isTesting}
        />
      </flexboxLayout>

      <progress value={progress} style={styles.progressBar} />

      <label text={currentPassword} style={styles.currentPassword} />

      <scrollView style={styles.logs}>
        {logs.map((log, index) => (
          <label key={index} text={log} style={styles.logEntry} />
        ))}
      </scrollView>

      <button
        text={isTesting ? 'Stop Testing' : 'Start Testing'}
        onTap={isTesting ? stopTesting : startTesting}
        style={[
          styles.actionButton,
          isTesting ? styles.stopButton : styles.startButton,
        ]}
      />
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    borderRadius: 5,
  },
  progressBar: {
    width: '100%',
    height: 10,
    marginBottom: 20,
  },
  currentPassword: {
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  logs: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 5,
    padding: 10,
  },
  logEntry: {
    color: '#ffffff',
    marginBottom: 5,
  },
  actionButton: {
    padding: 15,
    borderRadius: 5,
    color: '#ffffff',
  },
  startButton: {
    backgroundColor: '#2e6ddf',
  },
  stopButton: {
    backgroundColor: '#df2e2e',
  },
});
