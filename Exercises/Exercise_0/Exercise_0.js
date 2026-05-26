// --- Exercise 1: Selectors & Content ---
        const title = document.getElementById('title');
        const btn = document.getElementById('btn');
        
        title.innerText = "Hello JS!"; // Change text
        btn.style.backgroundColor = 'green'; // Change style directly

        // --- Exercise 2: Event Listeners & State ---

        let colors = ['blue', 'lightblue', 'red', 'yellow'];
        let colorsCount = 0;

        const counterSpan = document.querySelector('#counter');
        let count = 0;

        btn.addEventListener('click', () => {
            count++;
            counterSpan.innerText = count;

            btn.style.backgroundColor = colors[colorsCount];
            // colorsCount++;
            // if(colorsCount >= (colors.length) ) {
            //     colorsCount = 0;
            // }
            colorsCount = (colorsCount + 1) % colors.length;
            
        });

        // --- Exercise 3: Dynamic Creation (The "Vector" approach) ---
        const tasks = ['Buy milk', 'Clean room', 'Code C++', 'Master JS'];
        const list = document.querySelector('#task-list');

        tasks.forEach(taskText => {
            const li = document.createElement('li'); // Create node
            li.innerText = taskText;                 // Set content
            list.appendChild(li);                    // Inject into DOM tree
        });

        // --- Add button ---
        const taskInput0 = document.getElementById('taskInput0');
        const taskButton0 = document.getElementById('taskButton0');

        taskButton0.addEventListener('click', function(){
                const taskText = taskInput0.value;

                // To prevent empty tasks:
                if(taskText.trim() === '') return;

                const li = document.createElement('li');
                li.innerText = taskText;

                list.appendChild(li);

                taskInput0.value = '';  //clear input
                taskInput0.focus();     //focuses back on the input

        });


        // --- Exercise 4: Toggling Classes ---
        const box = document.getElementById('box');

        box.addEventListener('mouseenter', () => {
            box.classList.add('highlight');
        });

        box.addEventListener('mouseleave', () => {
            box.classList.remove('highlight');
        });