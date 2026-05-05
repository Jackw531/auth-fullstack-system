import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 删除 token
    localStorage.removeItem("token");

    // 跳回登录页
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Dashboard</h2>

        <p style={styles.text}>你已经成功登录 🎉</p>

        <button onClick={handleLogout} style={styles.logoutButton}>
          退出登录
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "300px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  text: {
    marginBottom: "20px",
  },
  logoutButton: {
    padding: "10px 20px",
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Dashboard;