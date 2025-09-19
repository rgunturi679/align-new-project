import * as Flex from '@twilio/flex-ui';
import { FlexEvent } from '../../../../types/feature-loader';

// Declare which event this hook belongs to
export const eventName = FlexEvent.taskCompleted;

// The function that runs when the event fires
export const eventHook = async function createCallLog(
  flex: typeof Flex,
  manager: Flex.Manager,
  task: Flex.ITask,
) {
  console.log("Raw Task object:", task);
  console.log("Task attributes:", task.attributes);

  // Extract useful fields from attributes
  const { from, outbound_to, direction, conference, conversations } = task.attributes;

  // Worker details
  const workerSid = manager.workerClient?.sid;
  const workerName =
    manager.workerClient?.attributes?.full_name ||
    manager.workerClient?.friendlyName ||
    workerSid;

  // Call lifecycle info
  const callDetails = {
    taskSid: task.sid,
    queueName: task.queueName,
    queueSid: task.queueSid,
    workflowName: task.workflowName,
    workflowSid: task.workflowSid,
    status: task.status, // "assigned", "wrapping", "completed"
    direction,           // inbound/outbound
    from,
    to: outbound_to,
    conferenceSid: conference?.sid,
    customerCallSid: conference?.participants?.customer,
    workerCallSid: conference?.participants?.worker,
    conversationSid: conversations?.conversation_id,
    segmentLink: conversations?.segment_link, // link to recordings / transcripts
    worker: workerName,
    callStartTime: task.dateCreated?.toISOString?.() ?? String(task.dateCreated),
    callEndTime: task.dateUpdated?.toISOString?.() ?? String(task.dateUpdated),
    durationSec: task.age, // age is lifetime in seconds
    hangUpBy: direction === "outbound" ? "agent" : "customer",
    notificationText: `Call ${task.status} by ${workerName}`,
  };

  console.log(" Call snapshot:", JSON.stringify(callDetails, null, 2));

  try {
    // Send call details to your Twilio Function
    const response = await fetch("https://charcoal-mongoose-4808.twil.io/call-logging", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(callDetails),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const result = await response.json();
    console.log("[DEBUG] Twilio Function response:", result);
  } catch (error) {
    console.error("[ERROR] Failed to create call log:", error);
  }
};

