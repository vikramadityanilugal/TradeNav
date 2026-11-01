chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type !== "ASK_TRADENAV") {
        return;
    }

    fetch("https://tradenav-jxtr.onrender.com/api/navigation/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            question: message.question
        })
    })
    .then(async (response) => {

        const answer = await response.text();

        if (!response.ok) {
            throw new Error(answer || `HTTP Error: ${response.status}`);
        }

        sendResponse({
            success: true,
            answer: answer
        });

    })
    .catch((error) => {

        console.error("TradeNav Backend Error:", error);

        sendResponse({
            success: false,
            error: error.message
        });

    });

    return true;
});