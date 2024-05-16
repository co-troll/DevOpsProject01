const registerBtn = document.querySelector('.registerBtn');
const haveId = document.querySelector('.alreadyHave');

registerBtn.addEventListener('click', function(){ // 회원가입 링크 누를시 이벤트 주는 함수

    let loginbox = document.querySelector('#rightInfoBox');
    loginbox.style.transform = 'translateX(400px)';
    loginbox.style.transitionDelay = '0s'

    let rightregBox = document.querySelector('.regBox');
    rightregBox.style.transform = 'translateX(450px)';
    rightregBox.style.transitionDelay = '0.4s'
    
})

haveId.addEventListener('click', function(){ // 아이디 이미 있으세요? 누를시 이벤트 주는 함수

    let loginbox = document.querySelector('#rightInfoBox');
    loginbox.style.transform = 'translateX(0px)';
    loginbox.style.transitionDelay = '0.4s'

    let rightregBox = document.querySelector('.regBox');
    rightregBox.style.transform = 'translateX(805px)';
    rightregBox.style.transitionDelay = '0s'

})


const check = document.querySelector('.regPasswordInput');
const reCheck = document.querySelector('.passwordreInput');
const mismatchMessage = document.querySelector('.mismatch-message');
const strongPasswordMessage = document.querySelector('.strong-message'); // 변수명 소문자로 시작

function strongPassword(str) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(str);
}

function isMatch(reg_pw1, reg_pw2) {
    return reg_pw1 === reg_pw2;
}

check.onkeyup = function () { // 비밀번호칸 정규식 함수
    // 값을 입력한 경우
    if (check.value.length !== 0) {
        if (strongPassword(check.value)) {
            strongPasswordMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
            strongPasswordMessage.classList.remove('text_show'); // 'text_show' 클래스 제거
        } else {
            strongPasswordMessage.classList.remove('hide'); // 실패 메시지가 보여야 함
            strongPasswordMessage.classList.add('text_show'); // 'text_show' 클래스 추가
        }
    } else {
        // 값을 입력하지 않은 경우 (지웠을 때)
        // 모든 메시지를 가린다.
        strongPasswordMessage.classList.add('hide');
        strongPasswordMessage.classList.remove('text_show'); // 'text_show' 클래스 제거
    }
};

reCheck.onkeyup = function () { // 비밀번호 확인 이벤트 함수
    if (reCheck.value.length !== 0) {
        if (isMatch(check.value, reCheck.value)) {
            mismatchMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
        } else {
            mismatchMessage.classList.remove('hide'); // 실패 메시지가 보여야 함
            mismatchMessage.classList.add('text_show');
        }
    } else {
        mismatchMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
    }
};

// 페이지 로드 시 로컬 스토리지에서 데이터 불러오기
let userArray = JSON.parse(localStorage.getItem('User')) || [];

class User {
    constructor(id, password, nick) {
        this.id = id;
        this.password = password;
        this.nick = nick;
    }
}

let regBtn = document.querySelector('.regBtn');

regBtn.addEventListener('click', function() { // 회원가입 버튼 누를시 로컬스토리지에 id,password,nick 값 저장
    let regIdInput = document.querySelector('.regidInput').value;
    let regPasswordInput = document.querySelector('.regPasswordInput').value;
    let nicknameInput = document.querySelector('.nicknameInput').value;


    // ID, nickname 빈칸 체크
    if(regIdInput === ''){
        alert('아이디를 입력해주세요.');
        return;
    }else if(nicknameInput === ''){
        alert('닉네임을 입력해주세요');
        return;
    }

    // 중복 ID 체크
    if (userArray.find(user => user.id === regIdInput)) { // 로컬스토리지 id 중복체크
        alert('이미 존재하는 ID입니다.'); // 나중에 class 추가해서 id 중복체크 할것임.
        return;
    }else if(userArray.find(user => user.nick === nicknameInput)){
        alert('이미 존재하는 닉네임입니다.'); // 나중에 class 추가해서 nickname 중복체크 할것임.
        return;
    }

    let userInfo = new User(regIdInput, regPasswordInput, nicknameInput);

    userArray.push(userInfo);

    localStorage.setItem('User', JSON.stringify(userArray));
    alert('회원가입이 완료되었습니다.');

    let loginbox = document.querySelector('#rightInfoBox');
    loginbox.style.transform = 'translateX(0px)';
    loginbox.style.transitionDelay = '0.4s'

    let rightregBox = document.querySelector('.regBox');
    rightregBox.style.transform = 'translateX(805px)';
    rightregBox.style.transitionDelay = '0s'
});

// 로그인 버튼을 클릭 했을때 로컬스토리지 값 먼저 비교 후, true면 세션스토리지에 그 로컬스토리지 값과 같은것을 Input.value로 저장후 이동

const loginBtn = document.querySelector('.loginBtn');

loginBtn.addEventListener('click', function(){ // 로컬스토리지 id, password값과 id, password input값이 같으면 sessionStorage에 id input값을 저장후 메인페이지로 넘어가게 할것.
    let IdInput = document.querySelector('.idInput').value;
    let PasswordInput = document.querySelector('.passwordInput').value;

    if((userArray.find(user => user.id === IdInput)) && (userArray.find(user => user.password === PasswordInput))){
        sessionStorage.setItem('login', IdInput);
        alert('로그인 완료');
        location.href('board.html');
    }
});

let checkbox = document.querySelector('#check_btn')

checkbox.addEventListener('click', function() {
    if(checkbox.checked){
        regBtn.disabled = false
    }else{
        regBtn.disabled = true
    }
})