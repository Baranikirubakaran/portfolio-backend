// Force download
document.querySelector('.download-btn').addEventListener('click', function () {
    fetch('kirubakaranresume.pdf')
        .then(res => res.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Kirubakaran-Resume.pdf';
            link.click();
            window.URL.revokeObjectURL(link.href);
        })
        .catch(err => console.error('Download failed:', err));
});

// Open in new tab
document.querySelector('.open-btn').addEventListener('click', function () {
    window.open('kirubakaranresume.pdf', '_blank');
});