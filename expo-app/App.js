import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from "react-native";

const profiles = [
  {
    label: "Creative profile",
    name: "Maya Santos",
    description: "Visual artist",
    about: "Turning everyday scenes into bright illustrations.",
    location: "Cebu City",
    color: "#F4C9B8",
    accent: "#CA684A"
  },
  {
    label: "Curious builder",
    name: "Theo Cruz",
    description: "Software student",
    about: "Learning to build useful things, one project at a time.",
    location: "Quezon City",
    color: "#C9E1E4",
    accent: "#4D7D83"
  },
  {
    label: "Meet a maker",
    name: "Aya Reyes",
    description: "Front-end developer",
    about: "I love accessible websites, clean layouts, and good coffee.",
    location: "Davao City",
    color: "#D7E7C8",
    accent: "#638B49"
  },
  {
    label: "On the go",
    name: "Nico Villanueva",
    description: "Mobile app designer",
    about: "Making small, thoughtful tools for everyday life.",
    location: "Baguio City",
    color: "#F2DFA0",
    accent: "#A57B1C"
  },
  {
    label: "Behind the lens",
    name: "Sam Flores",
    description: "Photographer",
    about: "Collecting light, quiet streets, and little stories.",
    location: "Iloilo City",
    color: "#E7D4E7",
    accent: "#96699A"
  },
  {
    label: "Words and community",
    name: "Lina Garcia",
    description: "Writer and volunteer",
    about: "Sharing ideas, stories, and Sunday meals.",
    location: "Makati City",
    color: "#CBDCCF",
    accent: "#527B5C"
  }
];

function ProfileCard({ profile, number, wide }) {
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <View style={[styles.card, { backgroundColor: profile.color }, wide && styles.cardWide]}>
      <View style={[styles.cardAccent, { backgroundColor: profile.accent }]} />
      <View style={styles.cardTopline}>
        <View style={styles.cardLabelWrap}>
          <View style={[styles.labelDot, { backgroundColor: profile.accent }]} />
          <Text style={styles.cardLabel}>{profile.label}</Text>
        </View>
        <Text style={styles.cardNumber}>{String(number).padStart(2, "0")}</Text>
      </View>

      <View style={styles.identity}>
        <View style={styles.avatar}>
          <Text style={[styles.avatarText, { color: profile.accent }]}>{initials}</Text>
        </View>
        <View style={styles.identityCopy}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.role}>{profile.description}</Text>
        </View>
      </View>

      <Text style={styles.about}>{profile.about}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.locationLabel}>BASED IN</Text>
        <Text style={styles.location}>{profile.location}</Text>
      </View>
    </View>
  );
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [availableProfiles, setAvailableProfiles] = useState(profiles);
  const [previousProfileName, setPreviousProfileName] = useState("");
  const { width } = useWindowDimensions();
  const wide = width >= 760;

  function addProfileCard() {
    const profilePool = availableProfiles.length
      ? availableProfiles
      : profiles.filter((profile) => profile.name !== previousProfileName);
    const selectedIndex = Math.floor(Math.random() * profilePool.length);
    const selectedProfile = profilePool[selectedIndex];

    setAvailableProfiles(profilePool.filter((_, index) => index !== selectedIndex));
    setPreviousProfileName(selectedProfile.name);
    setCards((currentCards) => [...currentCards, selectedProfile]);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.masthead}>
          <View style={styles.brand}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>p</Text>
            </View>
            <Text style={styles.brandName}>PROFILE CARD</Text>
          </View>
          <Text style={styles.mastheadNote}>Little intros, big personality</Text>
        </View>

        <View style={[styles.hero, wide && styles.heroWide]}>
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>A little hello</Text>
            <Text style={styles.title}>Meet someone new.</Text>
            <Text style={styles.heroNote}>
              A colorful collection of people, places, and little stories.
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={addProfileCard}
            style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
          >
            <Text style={styles.addButtonText}>Add Profile Card</Text>
            <Text style={styles.addButtonIcon}>+</Text>
          </Pressable>
        </View>

        {cards.length > 0 && (
          <View style={[styles.cardGrid, wide && styles.cardGridWide]}>
            {cards.map((profile, index) => (
              <ProfileCard
                key={`${profile.name}-${index}`}
                profile={profile}
                number={index + 1}
                wide={wide}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFAF1"
  },
  page: {
    width: "100%",
    maxWidth: 1168,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 64
  },
  masthead: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E2DDCF",
    paddingBottom: 16
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  brandMark: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#E87657"
  },
  brandMarkText: {
    color: "#FFFFFF",
    fontFamily: "serif",
    fontSize: 19
  },
  brandName: {
    color: "#25372D",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5
  },
  mastheadNote: {
    color: "#68746B",
    fontSize: 11
  },
  hero: {
    marginTop: 44,
    marginBottom: 34,
    gap: 24
  },
  heroWide: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  heroCopy: {
    maxWidth: 620
  },
  eyebrow: {
    marginBottom: 10,
    color: "#AD573E",
    fontSize: 12,
    fontWeight: "700"
  },
  title: {
    color: "#25372D",
    fontFamily: "serif",
    fontSize: 44,
    lineHeight: 50
  },
  heroNote: {
    maxWidth: 420,
    marginTop: 10,
    color: "#68746B",
    fontSize: 15,
    lineHeight: 23
  },
  addButton: {
    minHeight: 52,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#D36549",
    borderRadius: 7,
    backgroundColor: "#E87657",
    shadowColor: "#CD6045",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3
  },
  addButtonPressed: {
    transform: [{ translateY: 2 }],
    shadowOpacity: 0.5
  },
  addButtonText: {
    color: "#FFFAF1",
    fontSize: 13,
    fontWeight: "700"
  },
  addButtonIcon: {
    color: "#FFFAF1",
    fontSize: 22,
    lineHeight: 24
  },
  cardGrid: {
    gap: 18
  },
  cardGridWide: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  card: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    minHeight: 310,
    flexGrow: 1,
    flexBasis: "100%",
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(39, 54, 44, 0.08)",
    borderRadius: 14,
    shadowColor: "#484433",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 2
  },
  cardWide: {
    width: "48%",
    flexBasis: "48%"
  },
  cardAccent: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 5
  },
  cardTopline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardLabelWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  labelDot: {
    width: 7,
    height: 7,
    borderRadius: 4
  },
  cardLabel: {
    color: "#5A685D",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase"
  },
  cardNumber: {
    color: "rgba(39, 54, 44, 0.45)",
    fontSize: 11,
    fontWeight: "700"
  },
  identity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 24
  },
  avatar: {
    width: 68,
    height: 68,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.78)",
    borderRadius: 34,
    backgroundColor: "rgba(255, 255, 255, 0.66)"
  },
  avatarText: {
    fontFamily: "serif",
    fontSize: 25
  },
  identityCopy: {
    flex: 1,
    minWidth: 0
  },
  name: {
    color: "#27362C",
    fontFamily: "serif",
    fontSize: 27,
    lineHeight: 32
  },
  role: {
    marginTop: 4,
    color: "#46564A",
    fontSize: 13
  },
  about: {
    marginTop: 21,
    color: "#46564A",
    fontSize: 13,
    lineHeight: 21
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 18,
    paddingTop: 13,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(39, 54, 44, 0.18)"
  },
  locationLabel: {
    color: "#596A5D",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5
  },
  location: {
    color: "#27362C",
    fontSize: 12
  }
});