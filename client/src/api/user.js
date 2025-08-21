export const handleSave = async () => {
  const userData = { id, pw };

  try {
    const res = await fetch("http://localhost:8080/save", {
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