export default () => {
  window.addEventListener('message', event => {
    if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
      const fileInputs = document.querySelectorAll('.hs-fieldtype-file');
      if (fileInputs.length < 1) return;

      [...fileInputs].forEach(field => {
        let content = field.querySelector('span');
        let originalContent = field.innerHTML;
        let input = field.querySelector('input[type="file"]');

        input.addEventListener('change', () => {
          content.innerHTML = input.value.replace(/^.*\\/, '');

          if (input.value == '') {
            content.innerHTML = originalContent;
          }
        });
      });
    }
  });
};
