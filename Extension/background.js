chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {

        if (message.type !== "ASK_TRADENAV") {
            return;
        }

        fetch("http://localhost:8080/api/navigation/ask", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: message.question
            })
        })

        .then(async (serverResponse) => {

            const answer = await serverResponse.text();

            if (!serverResponse.ok) {
                throw new Error(answer);
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
    }
);