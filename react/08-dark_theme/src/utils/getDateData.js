function getTimes() {
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset);
    const isoString = today.toISOString();  // 2024-07-15T16:15:24.654Z
    const hourMinutes = (isoString.split("T")[1]).split(":");
    return hourMinutes[0] + hourMinutes[1];
}

export { getTimes };