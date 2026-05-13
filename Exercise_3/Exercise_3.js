console.log("JS Running");

const delayOld = function(ms) {
    return new Promise(
        function(resolve) {
            setTimeout(
                function() {
                    resolve();
                }, ms
            );
        }
    );
}
//
const delayNew = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const delay = delayNew;

async function PageRefresher(){
    await delay(3000);
    location.reload();
}

// PageRefresher(); 
// setTimeout(() => location.reload(), 3000);
// setTimeout(function(){location.reload();}, 3000);