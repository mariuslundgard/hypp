import {element} from 'hypp'

function replace(el: HTMLElement, nextEl: HTMLElement) {
  el.parentNode?.insertBefore(nextEl, el)
  el.parentNode?.removeChild(el)

  return nextEl
}

function App() {
  let clicks = 0

  const refs = {
    clicks: <span>0</span>,
  }

  const root = (
    <div
      class="p-4"
      hooks={{
        connect: () => console.log('connect'),
      }}
    >
      <h1 class="text-3xl font-bold">Hello</h1>

      <div class="mt-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          events={{
            click: () => {
              clicks += 1
              refs.clicks = replace(refs.clicks, <span>{clicks}</span>)
            },
          }}
        >
          Click {refs.clicks} times
        </button>
      </div>
    </div>
  )

  return root
}

document.getElementById('root')?.appendChild(<App />)
