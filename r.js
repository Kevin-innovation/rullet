let isSpinning = false;

const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const spinButton = document.getElementById('spinButton');
const point = document.getElementById('point');

function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

function updateSlot(slot, duration) {
    let counter = 0;
    let point = 0;
    const interval = setInterval(() => {
        slot.textContent = getRandomNumber();
        counter++;
        
        if (counter >= duration) {
            clearInterval(interval);
        }
    }, 100);
    
    return interval;
}

function spin() {
    if (isSpinning) return;
    
    isSpinning = true;
    spinButton.disabled = true;
    
    // 각 슬롯마다 다른 지속 시간을 설정하여 순차적으로 멈추도록 함
    const slot1Interval = updateSlot(slot1, 20);
    const slot2Interval = updateSlot(slot2, 25);
    const slot3Interval = updateSlot(slot3, 30);
    
    // 마지막 슬롯이 멈춘 후 버튼 활성화
    setTimeout(() => {
        clearInterval(slot1Interval);
        clearInterval(slot2Interval);
        clearInterval(slot3Interval);
        
        isSpinning = false;
        spinButton.disabled = false;
        
        // 결과 확인
        checkResult();
    }, 2000);
}

function checkResult() {
    const num1 = parseInt(slot1.textContent);
    const num2 = parseInt(slot2.textContent);
    const num3 = parseInt(slot3.textContent);
    
    if (num1 === num2 && num2 === num3) {
        alert('축하합니다! 잭팟입니다!');
    } else if (num1 === num2 || num2 === num3 || num1 === num3) {
        alert('축하합니다! 2개 숫자가 일치했습니다!');
    }
}

spinButton.addEventListener('click', spin);