const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
}

const SYMBOLS_VALUES = {
    "A":5,
    "B":4,
    "C":3,
    "D":2
}

const deposit = () => {
    while(true){
    const depositAmt = prompt("Enter a amount to deposit :");
        const TotalDepositAmt = parseFloat(depositAmt);

        if(isNaN(TotalDepositAmt) || TotalDepositAmt <= 0){
            console.log("Invalid Input , input again")
        } else {
            return TotalDepositAmt;
        }
    }
};

const getNoofLines = () =>{
    while (true) {
    const Lines = prompt("Enter the Number of lines to bet on (1-3)");
    const Nooflines = parseFloat(Lines);

    if(isNaN(Nooflines) || Nooflines <= 0 || Nooflines >3 ) {
        console.log("Invalid Number of lines , try again");
    } else {
        return Nooflines;
        }
    }
};

const getBet = (Balance,Linesnum) => {
    while (true) {
    const bet = prompt("Enter the amount to bet : ");
    const betAmt = parseFloat(bet);

    if(isNaN(betAmt) || betAmt <= 0 || betAmt > Balance / Linesnum ) {
        console.log("Invalid Bet Amount , try again");
    } else {
        return betAmt;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol , count] of Object.entries(SYMBOLS_COUNT)) {
        for(let i = 0;i<count;i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0;i< COLS;i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0;j < ROWS ; j++) {
            const randomIndex = Math.floor(Math.random()* reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }

    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0;i < ROWS ; i++){
        rows.push([]);
        for(let j = 0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printrows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for (const [i,symbol] of row.entries()) {
            rowString += symbol
            if(i !=row.length - 1) {
                rowString +=" | "
            }
        }
        console.log(rowString)
    }
};

const result = (rows,bet,Lines) => {
    let winnings = 0;
    for (let row = 0;row < Lines;row++) {
        const symbols = rows[row];
        let allequal = true;

        for (const symbol of symbols){
            if(symbol !=symbols[0]){
                allequal = false;
                break;
            }
        }
        if (allequal){
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
};

const game = () => {

let Balance = deposit();
while(true) {
    const Linesnum = getNoofLines();
    const betGame = getBet(Balance,Linesnum);
    Balance -= betGame * Linesnum;
    console.log("Your Balance is :"+Balance);
    const reels = spin();
    const rows = transpose(reels);
    printrows(rows);
    const winning = result(rows,betGame,Linesnum);
    Balance += winning;
    console.log("You Have Won : " +winning.toString());

    if(Balance <=0) {
        console.log("you ran out of Money");
        break;
    }

    const replay = prompt("Do you want to play again (y/n)?");

    if(replay != "y"){
        break;
    }
    }
};
game();