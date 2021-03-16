window.onload = () => {

    // keeps count of spread
    // is the same as the subscript in the array
    let spread = 0;

    // keeps track of the current page for the next and previous buttons
    let currentpage = 0;

    // keeps track of the page numbers
    let odd = 1;
    let even = 2;

    // func to populate the array with pages
    function Spread() 
    {
        // creates a new canvas for each new spread
        this.journalhtml = `<canvas id="bujopages" width="1400" height="900" style="border:1px solid #BCAF0A;"></canvas>`;

        // same as the array subscript
        this.spreadnum = spread;

        // keeps track of each page number the spread holds
        this.oddpage = odd;
        this.evenpage = even;

        // increments the counters for the next time that a new spread is created
        spread++;
        odd += 2;
        even += 2;

        // used for the next and previous buttons
        current(this.spreadnum);        
    }

    // func to create a cover for the journal
    function Cover()
    {
        // creates a new canvas for each new spread
        this.journalhtml = `<canvas id="cover" width="1400" height="900" style="border:1px solid black;"></canvas>`;

        // same as the array subscript
        this.spreadnum = spread;

        // increments the counter for the next time that a new spread is created
        spread++;

        // used for the next and previous buttons
        current(this.spreadnum);        
    }


    // creates an array for the pages and pushes a new page into the array
    cover = new Cover;
    let journarray = [];
    journarray.push(cover);
    console.log(journarray[spread - 1]);

    // keeps track of the current page for the next and previous buttons
    function current(int)
    {
        currentpage = int;
    }

    // fills journal div with a canvas
    let journal = document.getElementById("journal");
    journal.innerHTML = journarray[spread - 1].journalhtml;
    defaultCover();

    // shows which cover it is
    document.getElementById("oddpage").innerText = "Back";
    document.getElementById("evenpage").innerText = "Front";

    // takes user to the previous page
    document.getElementById("previous").addEventListener("click", function ()
    {
        // decrements current page so it goes to the previous page
        if(currentpage != 0)
        {
            currentpage--;
        }
        
        if(currentpage == 0)
        {
            // adds canvas of the cover
            journal.innerHTML = journarray[currentpage].journalhtml;
            defaultCover();
            console.log(journarray[currentpage]);

            // shows which cover it is
            document.getElementById("oddpage").innerText = "Back";
            document.getElementById("evenpage").innerText = "Front";
        }
        else
        {
            // adds canvas of current page
            journal.innerHTML = journarray[currentpage].journalhtml;
            defaultPage();
            console.log(journarray[currentpage]);

            // shows the odd page number
            oddpage = journarray[currentpage].oddpage;
            document.getElementById("oddpage").innerHTML = oddpage;

            // shows the even page number
            evenpage = journarray[currentpage].evenpage;
            document.getElementById("evenpage").innerHTML = evenpage;
        }

    });

    // takes user to the next page
    document.getElementById("next").addEventListener("click", function ()
    {
        if(currentpage + 1 < spread)
        {
            // increments current page so it goes to the next one
            currentpage++;

            // adds canvas of current page
            journal.innerHTML = journarray[currentpage].journalhtml;
            defaultPage();
            console.log(journarray[currentpage]);

            // shows the odd page number
            oddpage = journarray[currentpage].oddpage;
            document.getElementById("oddpage").innerHTML = oddpage;

            // shows the even page number
            evenpage = journarray[currentpage].evenpage;
            document.getElementById("evenpage").innerHTML = evenpage;
        }
        else
        {
            // creates a new page each time and pushes it into the array
            newpage = new Spread;
            journarray.push(newpage);
            console.log(journarray[spread - 1]);
            journal.innerHTML = journarray[spread - 1].journalhtml;
            defaultPage();
            
            // shows the odd page number
            oddpage = journarray[spread - 1].oddpage;
            document.getElementById("oddpage").innerHTML = oddpage;
        
            // shows the even page number
            evenpage = journarray[spread - 1].evenpage;
            document.getElementById("evenpage").innerHTML = evenpage;
        }

    });

    
    
}





    // __________   FUNCTIONS   __________

    // decorates the cover to look like a normal journal
    function defaultCover()
    {
        //gets the canvas element and returns drawing context
        let cover = document.getElementById("cover");
        let ctx = cover.getContext("2d");

        //sets the color of the pages
        ctx.fillStyle = "#232323";
        ctx.fillRect(0, 0, 1400, 900);

        //draws a line down the middle to separate the pages
        ctx.moveTo(700, 0);
        ctx.lineTo(700, 900);
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    // decorates the current page to look like a normal journal
    function defaultPage()
    {
        //gets the canvas element and returns drawing context
        let bujopages = document.getElementById("bujopages");
        let ctx = bujopages.getContext("2d");

        //sets the color of the pages
        ctx.fillStyle = "#FEFFDE";
        ctx.fillRect(0, 0, 1400, 900);

        //draws a line down the middle to separate the pages
        ctx.moveTo(700, 0);
        ctx.lineTo(700, 900);
        ctx.strokeStyle = "#C8BC27";
        ctx.stroke();

        //add "bullets" to the journal
        ctx.strokeStyle = "#BCAF0A";
        for(let i = 25; i <= 1400; i += 30)
        {
            for(let j = 66; j <= 900; j += 30)
            {
                ctx.beginPath();
                ctx.arc(i, j, 1, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }
    }
