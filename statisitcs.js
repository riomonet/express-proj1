const express = require ('express')
const {ExpressError} = require ('./expressError')

const app = express();

app.use(express.json()); 

app.listen();

app.get('/mean', (req, res, next) => {
    mean = op_handler(req.query.nums,findMean)
    res.json(results('mean', mean))
})

app.get('/median', (req, res, next)=> {
    median = op_handler(req.query.nums,findMedian)
    res.json(results('median', median))
})

app.get('/mode', (req, res, next)=> {
    mode = op_handler(req.query.nums,findMode)
    res.json(results('mode', mode))
})


function results(name, val) {
    return { response : { operation : name, value: val }}
}

function op_handler(nums, type) {
    
    let arr = nums.split(',').map(x => +x)
    return type(arr)
}

function findMean(nums) {
    sum = nums.reduce((acc,next)=>{
	return acc+next;
    },0)
    return sum/nums.length
}

function findMedian(nums) {
    let sorted = nums.sort( (a,b) =>  a - b);
    let mid = getMidpoint(sorted)
    return isOdd(sorted) ? sorted[mid] :  (sorted[mid] + sorted[mid-1])/2

}

function isOdd(nums) {
    return (nums.length % 2 !== 0)
}

function getMidpoint(nums) {
    return Math.floor(nums.length/2)
}

function findMode(nums) {
    let tally = {};
    let mode, max = 0;

    nums.map(x => x in tally ? tally[x]++ : tally[x] = 1)

    Object.keys(tally).map(k => {
	if (tally[k] > max) {
	    max = tally[k];
	    mode = k;
	}
    })
    return mode
}


app.use((error, req, res, next) => {

    res.status(402).send("dum ")
    console.log(error.msg,error.stat)
})

app.listen(3000, function () {
    console.log('app on port 3000')
})

