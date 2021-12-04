let words = [
    [
        ['adapt', ['адаптуватися', 'адаптувати']],
        ['amazing', ['дивний', 'дивовижний']],
        ['apply', ['застосовувати', 'вживати', 'використувати']],
        ['monitor', ['монітор', 'контролювати']],
        ['nuclear', ['ядерний']],
        ['overall', ['загалом', 'абсолютний', 'роба']],
        ['perspective', ['перспектива', 'переспективний']],
        ['potato', ['картопля', 'картопляний', 'бульба']],
        ['profit', ['прибуток', 'користь', 'вигода']],
        ['record', ['запис', 'рекорд']],
    ],
    [
        ['reality', ['реальність', 'дійсність', 'істинність']],
        ['shadow', ['тінь', 'напівтемрява']],
        ['yesterday', ['вчора', 'учора']],
        ['zone', ['зона', 'полоса']],
        ['enterprise', ['підприємство', 'діловитість']],
        ['entertainment', ['розваги', 'видовище', 'прийом']],
        ['commitment', ['прихильність', 'арешт']],
        ['comedy', ['комедія', 'потішна подія', 'удавання']],
        ['ancient', ['стародавній', 'античний', 'старезний']],
        ['aim', ['ціль', 'мішень']],
    ],
    [
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
    ],
];
let max = [0, 0, 0];
words.forEach(arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = [...arr[i]];
        arr[i] = [...arr[j]];
        arr[j] = [...temp];
    }
});
let answers = [];
for (let i = 0; i < words.length; i++) {
    answers.push([]);
    for (let j = 0; j < words[i].length; j++) {
        answers[i].push(['', 0]);
    }
}
let position = 1;
let difficulty = 0;
$('#right').text(0);
$('#wrong').text(0);
$('#card').val(words[difficulty][0][0]);
$('.pos').text(position + '/' + words[difficulty].length);
$('#prev').on('click', prev);
$('#next').on('click', next);
$('#card').on('click', calculate);

$('input[name="difficulty"]').on('click', () => {
    difficulty = Number($('input[name="difficulty"]:checked').val());
    if(position > max[difficulty] + 1) position = max[difficulty] + 1;
    let right = 0;
    let wrong = 0;
    answers[difficulty].forEach(item => {
        if (item[1] == 1) {
            right++;
        }
        else if (item[1] == -1) wrong++;
    });
    $('#right').text(right);
    $('#wrong').text(wrong);
    $('#card').val(words[difficulty][position - 1][0]);
    $('#answer').val(answers[difficulty][position - 1][0]);
    $('#answer').css('background', answers[difficulty][position - 1][1] == 1 ? '#90ee90' : answers[difficulty][position - 1][1] == -1 ? '#ff7f7f' : '');
    $('.pos').text(position + '/' + words[difficulty].length);
});



function prev() {
    if (position > 1) position--;
    $('#card').val(words[difficulty][position - 1][0]);
    $('#answer').val(answers[difficulty][position - 1][0]);
    $('#answer').css('background', answers[difficulty][position - 1][1] == 1 ? '#90ee90' : answers[difficulty][position - 1][1] == -1 ? '#ff7f7f' : '');
    $('.pos').text(position + '/' + words[difficulty].length);
}

function next() {
    if (answers[difficulty][position - 1][1] != 0) {
        if (max[difficulty] < words[difficulty].length) max[difficulty]++;
        if (position < max[difficulty] + 1) position++;
        else position = max[difficulty] + 1;
        $('#card').val(words[difficulty][position - 1][0]);
        $('#answer').val(answers[difficulty][position - 1][0]);
        $('#answer').css('background', answers[difficulty][position - 1][1] == 1 ? '#90ee90' : answers[difficulty][position - 1][1] == -1 ? '#ff7f7f' : '');
        $('.pos').text(position + '/' + words[difficulty].length);
    }
}

function calculate() {
    answers[difficulty][position - 1] = [$('#answer').val(), ((jQuery.inArray($('#answer').val(), words[difficulty][position - 1][1]) != -1) ? 1 : -1)];
    $('#answer').css('background', answers[difficulty][position - 1][1] == 1 ? '#90ee90' : answers[difficulty][position - 1][1] == -1 ? '#ff7f7f' : '');
    let right = 0;
    let wrong = 0;
    answers[difficulty].forEach(item => {
        if (item[1] == 1) {
            right++;
        }
        else if (item[1] == -1) wrong++;
    });
    $('#right').text(right);
    $('#wrong').text(wrong);
    if (right + wrong == words[difficulty].length)
        alert('your knowledge level is ' + right / words[difficulty].length * 100 + '%');
}