let words = [
    ['ability', ['здатність', 'здібність', 'обдарованість']],
    ['beneath', ['нижче', 'унизу']],
    ['century', ['століття', 'вік']],
    ['desire', ['бажання', 'жадоба']],
    ['engine', ['двигун', 'знаряддя']],
    ['faculty', ['факультет', 'виділ', 'влада']],
    ['habit', ['звичка', 'норов']],
    ['industrial', ['промисловий', 'виробничий', 'індустріальний']],
    ['lack', ['відсутність', 'дефіцит', 'недостача']],
    ['middle', ['середній', 'середина']],
];

for (let i = words.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = [...words[i]];
    words[i] = [...words[j]];
    words[j] = [...temp];
}

let answers = Array(words.length).fill(['', 0]);
let position = 1;
$('#right').text(0);
$('#wrong').text(0);
$('#card').val(words[0][0]);
$('.pos').text(position + '/' + words.length);
$('#prev').on('click', prev);
$('#next').on('click', next);

$('#card').on('click', () => {
    answers[position - 1] = [$('#answer').val(), ((jQuery.inArray($('#answer').val(), words[position - 1][1]) != -1) ? 1 : -1)];
    $('#answer').css('background', answers[position - 1][1] == 1 ? '#90ee90' : answers[position - 1][1] == -1 ? '#ff7f7f' : '');
    let right = 0;
    let wrong = 0;
    answers.forEach(item => {
        if (item[1] == 1) {
            right++;
        }
        else if (item[1] == -1) wrong++;
    });
    $('#right').text(right);
    $('#wrong').text(wrong);
    console.log(right);
    console.log(wrong);
    console.log(answers);
    if(right + wrong == words.length)
        alert('your knowledge level is ' + right / words.length * 100 + '%');
});

function prev() {
    if (position > 1) position--;
    $('#card').val(words[position - 1][0]);
    $('#answer').val(answers[position - 1][0]);
    $('#answer').css('background', answers[position - 1][1] == 1 ? '#90ee90' : answers[position - 1][1] == -1 ? '#ff7f7f' : '');
    $('.pos').text(position + '/' + words.length);
}

function next() {
    if (answers[position - 1][1] != 0) {
        if (position < words.length) position++;
        else position = 1;
        $('#card').val(words[position - 1][0]);
        $('#answer').val(answers[position - 1][0]);
        $('#answer').css('background', answers[position - 1][1] == 1 ? '#90ee90' : answers[position - 1][1] == -1 ? '#ff7f7f' : '');
        $('.pos').text(position + '/' + words.length);
    }
}