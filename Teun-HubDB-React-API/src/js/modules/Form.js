export default () => {
  window.addEventListener('message', event => {
    if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
      const fields = document.querySelectorAll('.hs-form-field');
      if (fields.length < 1) return;
      [...fields].forEach(field => {
        field.classList.add('active');

        const inputs = field.querySelectorAll('input, textarea');

        [...inputs].forEach(input => {
          input.addEventListener('focus', () => {
            input.classList.add('focus');
            field.classList.add('focus');
          });

          if (input.value !== '') {
            field.classList.add('seen');
            input.classList.add('seen');
          }

          input.addEventListener('blur', () => {
            input.classList.remove('focus');
            field.classList.remove('focus');
            field.classList.add('seen');
            input.classList.add('seen');
          });

          const classObserver = new MutationObserver((mutationsList, observer) => {
            // Use traditional 'for loops' for IE 11
            for (let mutation of mutationsList) {
              if (mutation.type === 'attributes') {
                if (mutation.attributeName === 'class') {
                  mutation.target.classList.contains('error') || mutation.target.classList.contains('invalid')
                    ? field.classList.add('error')
                    : field.classList.remove('error');
                }
              }
            }
          });

          classObserver.observe(input, { attributes: true });
        });
      });
    }
  });
};
