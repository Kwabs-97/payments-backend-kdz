import csv from 'fast-csv'

function generateCSV(){

const csvStream = csv.format({ headers: true });

csvStream.pipe(process.stdout).on('end', () => process.exit());

csvStream.write({ header1: 'row1-col1', header2: 'row1-col2' });
csvStream.write({ header1: 'row2-col1', header2: 'row2-col2' });
csvStream.write({ header1: 'row3-col1', header2: 'row3-col2' });
csvStream.write({ header1: 'row4-col1', header2: 'row4-col2' });
csvStream.end();
}