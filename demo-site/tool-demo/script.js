let currentMode = 'manual';
let isFullscreen = false;

function selectComponent(event) {
    event.stopPropagation();
    document.getElementById('calendarComponent').classList.add('is-selected');
}
document.addEventListener('click', function() {
    document.getElementById('calendarComponent').classList.remove('is-selected');
});

function toggleFullscreen() {
    const modal = document.getElementById('modalWindow');
    const btn = document.getElementById('resizeBtn');
    isFullscreen = !isFullscreen;
    if (isFullscreen) { modal.classList.add('is-fullscreen'); btn.innerText = '内側に縮小'; } 
    else { modal.classList.remove('is-fullscreen'); btn.innerText = '⬜ 大画面に拡大'; }
}

function openModal(event) {
    event.stopPropagation();
    const currentHTML = document.getElementById('calendarContainer').querySelector('table').outerHTML;
    const wrapper = document.getElementById('manualCalendarWrapper');
    wrapper.innerHTML = currentHTML;
    
    setupAllEditableCells(wrapper);

    document.getElementById('htmlInput').value = currentHTML.trim();
    document.getElementById('editModal').style.display = 'flex';
}

function setupAllEditableCells(wrapper) {
    const cells = wrapper.querySelectorAll('table td');
    cells.forEach(cell => {
        if (cell.innerText.trim() !== '' || cell.hasAttribute('colspan')) {
            cell.setAttribute('contenteditable', 'true');
            cell.addEventListener('keydown', handleCellKeyDown);
            cell.addEventListener('input', syncToHTMLTextArea);
            cell.addEventListener('blur', syncToHTMLTextArea);
        }
    });
}

function handleCellKeyDown(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        this.innerText = ''; 
        this.blur(); 
        syncToHTMLTextArea();
    }
}

function syncToHTMLTextArea() {
    const wrapper = document.getElementById('manualCalendarWrapper');
    const rows = wrapper.querySelectorAll('table tbody tr');
    
    rows.forEach((row, rowIndex) => {
        const currentHumanRowIndex = rowIndex + 1;
        if ((currentHumanRowIndex - 5) % 3 === 0) {
            row.querySelectorAll('td').forEach(cell => {
                const text = cell.innerText.trim();
                if (text === '休') { cell.className = 'is-off-day'; } 
                else { cell.className = ''; }
            });
        }
    });

    const currentEditingHTML = wrapper.querySelector('table').outerHTML;
    document.getElementById('htmlInput').value = currentEditingHTML.trim();
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
    if(isFullscreen) toggleFullscreen(); 
}

function switchTab(mode) {
    currentMode = mode;
    const manualTab = document.getElementById('tab-manual-btn');
    const htmlTab = document.getElementById('tab-html-btn');
    const manualContent = document.getElementById('mode-manual');
    const htmlContent = document.getElementById('mode-html');

    if (mode === 'manual') {
        const currentHTMLText = document.getElementById('htmlInput').value;
        const wrapper = document.getElementById('manualCalendarWrapper');
        wrapper.innerHTML = currentHTMLText;
        setupAllEditableCells(wrapper);
        manualTab.classList.add('is-active');
        htmlTab.classList.remove('is-active');
        manualContent.classList.add('is-active');
        htmlContent.classList.remove('is-active');
    } else {
        syncToHTMLTextArea();
        manualTab.classList.remove('is-active');
        htmlTab.classList.add('is-active');
        manualContent.classList.remove('is-active');
        htmlContent.classList.add('is-active');
    }
}

function saveComponent() {
    const finalHTML = document.getElementById('htmlInput').value;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = finalHTML;
    
    tempDiv.querySelectorAll('td').forEach(cell => {
        cell.removeAttribute('contenteditable');
        if(cell.className === "") { cell.removeAttribute('class'); }
    });

    document.getElementById('calendarContainer').innerHTML = tempDiv.innerHTML;
    closeModal();
}