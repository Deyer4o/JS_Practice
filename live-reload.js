function run() {
    let lastModified = null;
    
    async function checkUpdate() {
      try {
        // 'HEAD' request is fast because it doesn't download the whole page
        const response = await fetch(window.location.href, { 
          method: 'HEAD', 
          cache: 'no-cache' 
        });
        
        const currentModified = response.headers.get('Last-Modified');

        // If we have a previous timestamp and it's different from the current one
        if (lastModified && lastModified !== currentModified) {
          location.reload();
        }
        
        lastModified = currentModified;
      } catch (e) {
        // Silently fail if the server is temporarily down during a restart
      }
    }

    const isLocal = (window.location.hostname === "localhost" 
                  || window.location.hostname === "127.0.0.1");
    if(isLocal){
      // Check every second
      setInterval(checkUpdate, 1000);
    }
}

function Refresher(){
  
  function getFilesToWatch(){
    return [... new Set([ //using SET so there's no duplicates
    window.location.href, //HTML

    ...Array.from(document.scripts) //JS
        .map(script => script.src)
        .filter(Boolean),

    ...Array.from(document.styleSheets) //CSS
        .map(sheet => sheet.href)
        .filter(Boolean)

      ])];
  }


}

run();