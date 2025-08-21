const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8080';

export const handleSave = async ({ id, pw }) => {
  const userData = { id, pw };

  try {
    const res = await fetch(`${API_BASE}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error("서버 요청 실패");
    }

    const result = await res.json();
    alert(result.message || "회원 데이터 json 저장완료");
  } catch (error) {
    console.error(error);
    alert("json 저장 중 오류가 발생했습니다.");
  }
};