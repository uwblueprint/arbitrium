import { GET, POST } from "./Helper";

async function getAllRankings(userId, programId) {
  return GET(`/api/stackings/${userId}/${programId}`);
}

async function updateRankings(databody) {
  return POST("/api/stackings", databody);
}

export { getAllRankings, updateRankings };
