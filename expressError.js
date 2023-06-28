class ExpressError extends Error {
    constructor(msg, stat) {
	super(); //runs constructor for parent class
	this.msg = msg;
	this.stat = stat;
	// console.error(this.stack)
    }
}

module.exports = { ExpressError }
