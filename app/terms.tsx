import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';

const SECTIONS = [
  {
    title: '1. About the App',
    body: 'Tiny Explorers is an educational app designed for children aged 4+. It is intended to be used under parental supervision.',
  },
  {
    title: '2. Use of the App',
    body: 'This app is for personal, non-commercial use only. You may not copy, modify, or distribute any part of the app without our written permission.',
  },
  {
    title: '3. In-App Purchases',
    body: 'Tiny Explorers offers a one-time purchase to unlock all content. All purchases are final and processed through Google Play. You may restore a previous purchase at any time using the "Restore Purchase" option.',
  },
  {
    title: '4. Refunds',
    body: 'Refund requests are handled by Google Play in accordance with their refund policy.',
  },
  {
    title: '5. Privacy',
    body: 'We do not collect any personal information from children. No account creation is required to use this app. Please refer to our Privacy Policy for full details.',
  },
  {
    title: '6. Disclaimer',
    body: 'The app is provided "as is" without warranties of any kind. We are not liable for any damages arising from use of the app.',
  },
  {
    title: '7. Changes',
    body: 'We may update these terms occasionally. Continued use of the app after changes means you accept the updated terms.',
  },
  {
    title: '8. Contact',
    body: 'Questions? Email us at: tinytech2026@zohomail.in',
  },
];

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Terms &amp; Conditions</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.updated}>Last updated: May 2026</Text>

        {SECTIONS.map((s) => (
          <View key={s.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{s.title}</Text>
            <Text style={styles.sectionBody}>{s.body}</Text>
          </View>
        ))}

        <Text style={styles.footer}>© 2026 Tiny Explorers. All rights reserved.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgMain },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  backBtn: {
    width: MIN_TAP_TARGET,
    height: MIN_TAP_TARGET,
    borderRadius: Radii.full,
    backgroundColor: Colors.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: { fontSize: FontSizes.lg, color: Colors.textPrimary },
  heading: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: FontSizes.md,
    fontWeight: '800',
    color: Colors.primaryDark,
  },

  scroll: { padding: Spacing.lg, gap: Spacing.lg, paddingBottom: Spacing.xxl },
  updated: { fontSize: FontSizes.xs, color: Colors.textMuted, marginBottom: Spacing.sm },

  section: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radii.md,
    padding: Spacing.lg,
    gap: Spacing.xs,
  },
  sectionTitle: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.primaryDark },
  sectionBody: { fontSize: FontSizes.sm, color: Colors.textPrimary, lineHeight: 22 },

  footer: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
