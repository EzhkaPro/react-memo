const baseURL = "https://wedev-api.sky.pro/api/leaderboard";

export async function getLeaderBoard() {
  const response = await fetch(baseURL, {
    method: "GET",
  });
  if (response.status !== 200) {
    throw new Error("Ошибка получения данных");
  } else {
    const data = await response.json();

    return data;
  }
}

export async function addLeaderBoard({ achievements, name, time }) {
  const response = await fetch(baseURL, {
    method: "POST",
    body: JSON.stringify({ achievements, name, time }),
  });
  if (response.status === 201) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Ошибка добавления данных");
  }
}
