import * as Notifications from "expo-notifications";

export const scheduleTaskNotification = async (
  id: string,
  title: string,
  description: string,
  date: string,
  time: string
) => {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  const triggerDate = new Date(year, month - 1, day, hour, minute, 0);

  if (triggerDate <= new Date()) {
    console.log("Selected time is in the past. Notification skipped.");
    return;
  }

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: description.split("\n")[0] || "",
        sound: "default",
      },
      trigger: triggerDate,
    });
    console.log("Notification scheduled for", triggerDate);
  } catch (err) {
    console.log("Error scheduling notification:", err);
  }
};
