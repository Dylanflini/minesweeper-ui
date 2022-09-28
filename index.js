class Minesweeper extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	async connectedCallback() {
		const root = this.shadowRoot

		const a = document.createElement('div')
		a.textContent = 'hola minesweeper'

		const rows = Number(this.getAttribute('rows'))
		const columns = Number(this.getAttribute('columns'))
		const bombs = Number(this.getAttribute('bombs'))

		const params = {
			rows,
			columns,
			bombs,
		}

		const { id, cells } = await fetch(
			'http://localhost:4000/start?' + new URLSearchParams(params)
		).then(r => r.json())

		const cellContainer = document.createElement('div')
		cellContainer.classList.add('cell-container')
		cellContainer.addEventListener('click', ({ target }) => {
			const { x, y } = target.dataset
			console.log(x, y)
		})

		cells.forEach(cell => {
			const button = document.createElement('button')
			button.classList.add('cell')
			button.dataset.x = cell.position[0]
			button.dataset.y = cell.position[1]

			cellContainer.appendChild(button)
		})

		const style = document.createElement('style')
		style.innerHTML = `
      .cell {
        padding: 0;
        margin: 0;
        width: 1.5rem;
        height: 1.5rem;
      }

      .cell-container {
        width: min-content;
        display: grid;
        grid-template-columns: repeat(${columns}, 1fr);
      }
    `

		root.appendChild(a)
		root.appendChild(cellContainer)
		root.appendChild(style)
	}
}

customElements.define('minesweeper-game', Minesweeper)
