import { StyleSheet } from 'react-native';
import { PasswordTester } from '@/components/PasswordTester';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.container}>
      <PasswordTester />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});