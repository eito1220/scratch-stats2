let chart;

async function loadStats() {
  const username = document.getElementById("username").value.trim();
  if (!username) return;

  const res = await fetch(`/api/user/${username}`);
  if (!res.ok) {
    alert("ユーザーが存在しません");
    return;
  }

  const data = await res.json();

  const followers = data.statistics.followers;
  const following = data.statistics.following;
  const projects = data.statistics.projects;

  document.getElementById("info").textContent =
    `フォロワー: ${followers} / フォロー: ${following} / 作品: ${projects}`;

  drawChart(followers, following, projects);
}

function drawChart(followers, following, projects) {
  const ctx = document.getElementById("chart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["フォロワー", "フォロー", "作品数"],
      datasets: [{
        label: "統計",
        data: [followers, following, projects]
      }]
    }
  });
}
