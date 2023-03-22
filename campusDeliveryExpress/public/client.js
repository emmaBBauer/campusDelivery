window.onload = () => {
    fetch('./user')
        .then(response => response)
        .then(data => {
        console.log(data);
    });
};
export {};
