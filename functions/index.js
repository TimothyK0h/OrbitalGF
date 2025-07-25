const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.resetCompletedDailyQuests = onSchedule(
  { schedule: "0 16 * * *", timeZone: "Asia/Singapore" }, 
  async () => {
    await resetCompletedQuestsByType("daily");
  }
);


exports.resetCompletedWeeklyQuests = onSchedule(
  { schedule: "0 16 * * 1", timeZone: "Asia/Singapore" }, 
  async () => {
    await resetCompletedQuestsByType("weekly");
  }
);

// THIS IS FOR TESTING
exports.testResetQuests = onRequest(async (req, res) => {
  const type = req.query.type || "daily";
  await resetCompletedQuestsByType(type);
  res.send(`Tested reset for ${type} quests.`);
});

async function resetCompletedQuestsByType(questType) {
  try {
    const usersSnap = await db.collection("users").get();
    const defaultQuestsSnap = await db
      .collection("defaultQuests")
      .where("type", "==", questType)
      .get();

    let defaultQuests = defaultQuestsSnap.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    const userUpdates = usersSnap.docs.map(async (userDoc) => {
      const userId = userDoc.id;
      const userQuestRef = db.collection("users").doc(userId).collection("quests");

      const completedSnap = await userQuestRef
        .where("type", "==", questType)
        .where("completed", "==", true)
        .get();

      const shuffledQuests = shuffle([...defaultQuests]);

      const updates = completedSnap.docs.map((completedDoc, index) => {
        const newQuest = shuffledQuests[index % shuffledQuests.length]; 
        return userQuestRef.doc(completedDoc.id).set({
          ...newQuest.data,
          completed: false,
          assignedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      });

      return Promise.all(updates);
    });

    await Promise.all(userUpdates);
    logger.info(`✅ ${questType} quests reset for all users.`);
    return null;
  } catch (err) {
    logger.error(`❌ Failed to reset ${questType} quests:`, err);
    throw err;
  }
}

