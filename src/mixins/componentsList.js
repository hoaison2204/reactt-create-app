export default {
  methods: {
    getElement(values) {
      const wrapperElement = document.createElement('div');
      const element = document.createElement(values.tag) || null;
      if (!element) return;
      if (values.classes) {
        values.classes.forEach(item => {
          element.classList.add(item);
        });
      }
      element.textContent = values.label + ' ' + values.classes || '';
      wrapperElement.appendChild(element);
      return wrapperElement;
    },
    setElements(id, data) {
      const elementsData = data ? data : this.elements || [];
      if (!elementsData) return;
      elementsData.forEach(item => {
        const element = this.getElement(item) || null;
        if (!element) return;
        element.classList.add('components-list-container');
        document.getElementById(id).appendChild(element);
      });
    }
  }
}
