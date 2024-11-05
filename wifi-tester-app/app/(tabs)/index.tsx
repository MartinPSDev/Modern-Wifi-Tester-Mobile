import { StyleSheet } from 'react-native';
import { DictionaryGenerator } from '@/components/DictionaryGenerator';
import { ThemedView } from '@/components/ThemedView';

export default function TabOneScreen() {
  return (
    <ThemedView style={styles.container}>
      <DictionaryGenerator />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});