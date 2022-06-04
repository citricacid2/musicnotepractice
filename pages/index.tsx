import type { NextPage } from 'next'
import Head from 'next/head'
import abcjs from 'abcjs'
import { WebMidi, NoteMessageEvent } from 'webmidi'
import { createRef, useEffect, useState } from 'react'

const Home: NextPage = () => {
  const possibleNotes: { abc: string; midi: string }[] = [
    {
      abc: 'C',
      midi: 'C3',
    },
    {
      abc: 'D',
      midi: 'D3',
    },
    {
      abc: 'E',
      midi: 'E3',
    },
    {
      abc: 'F',
      midi: 'F3',
    },
    {
      abc: 'G',
      midi: 'G3',
    },
    {
      abc: 'A',
      midi: 'A3',
    },
    {
      abc: 'B',
      midi: 'B3',
    },
    {
      abc: 'C',
      midi: 'C4',
    },
    {
      abc: 'D',
      midi: 'D4',
    },
    {
      abc: 'E',
      midi: 'E4',
    },
    {
      abc: 'F',
      midi: 'F4',
    },
    {
      abc: 'G',
      midi: 'G4',
    },
    {
      abc: 'A',
      midi: 'A4',
    },
    {
      abc: 'B',
      midi: 'B4',
    },
    {
      abc: 'C',
      midi: 'C5',
    },
    {
      abc: 'D',
      midi: 'D5',
    },
    {
      abc: 'E',
      midi: 'E5',
    },
    {
      abc: 'F',
      midi: 'F5',
    },
  ]

  const [note, setNote] = useState(possibleNotes[0])

  useEffect(() => {
    const abc = abcjs.renderAbc('paper', note.abc, {
      // responsive: 'resize',
      staffwidth: 100,
    })
  })

  function checkNote(e: NoteMessageEvent) {
    console.log('the piano played:', e.note.identifier)
    if (note.midi === e.note.identifier) {
      console.log('success')
      newNote()
    }
  }

  useEffect(() => {
    // WebMidi.enable()
    //   .then(onEnabled)
    //   .catch((err) => alert(err))

    function onEnabled() {
      const inputs = WebMidi.inputs
      if (inputs.length === 0) {
        alert('No MIDI devices detected.')
      } else {
        inputs.forEach((device, index) => {
          console.log(`${index}: ${device.name}`)
          device.channels[1].removeListener()
          device.channels[1].addListener('noteon', checkNote)
        })
      }
    }
  })

  function newNote() {
    setNote(possibleNotes[Math.floor(Math.random() * possibleNotes.length)])
    console.log('target note:', note)
  }

  return (
    <div className="grid h-screen grid-cols-4 grid-rows-3 items-stretch bg-blue-500 ">
      <div className="col-span-2 row-span-2 m-5 rounded-lg bg-blue-100 p-5 shadow-lg">
        <Heading value="Guess:" />
        <div id="paper" className=""></div>
      </div>
      <div className="row-span-2 m-5 flex flex-col rounded-lg bg-blue-100 p-5 shadow-lg">
        <Heading value="Mode:" />
        <div className="grid grow items-stretch">
          {['Note', 'Letter', 'Ear'].map((mode) => (
            <div key={mode} className="grid items-stretch">
              <input
                className="peer hidden"
                type="radio"
                name="note"
                id={mode}
              />
              <label
                className="mx-10 my-5 flex cursor-pointer items-center justify-center rounded-lg border-2 bg-white hover:bg-slate-100 peer-checked:border-blue-500"
                htmlFor={mode}
              >
                <p>{mode}</p>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="row-span-3 m-5 flex flex-col rounded-lg bg-blue-100 p-5 shadow-lg">
        <Heading value="Options:" />
        <div className="grid grid-cols-2 items-stretch">
          {possibleNotes.map((note) => (
            <div key={note.midi} className="grid items-stretch">
              <input
                className="peer hidden"
                type="checkbox"
                name="note"
                id={note.midi}
                onChange={() => setNote(note)}
              />
              <label
                className="m-2 cursor-pointer rounded-lg border-2 bg-white p-2 text-center hover:bg-slate-100 peer-checked:border-blue-500"
                htmlFor={note.midi}
              >
                {note.midi}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className=" m-5 rounded-lg bg-blue-100 p-5 shadow-lg">
        <Heading value="Device:" />
        {WebMidi.enabled &&
          WebMidi.inputs.map((device) => (
            <div key={device.name} className="grid items-stretch">
              <input
                className="peer hidden"
                type="radio"
                name="note"
                id={device.name}
              />
              <label
                className="m-2 cursor-pointer rounded-lg border-2 bg-white p-2 text-center hover:bg-slate-100 peer-checked:border-blue-500"
                htmlFor={device.name}
              >
                {device.name}
              </label>
            </div>
          ))}
      </div>
      <div className="col-span-2 m-5 flex flex-row rounded-lg bg-blue-100 p-5 shadow-lg">
        <div className="flex flex-1 flex-col items-stretch justify-center text-center">
          <h1 className=" text-8xl font-bold">20</h1>
          <h3 className="text-3xl text-gray-700">Correct</h3>
        </div>
        <div className="flex flex-1 flex-col items-stretch justify-center text-center">
          <h1 className=" text-8xl font-bold">5</h1>
          <h3 className="text-3xl text-gray-700">Incorrect</h3>
        </div>
        <div className="flex flex-1 flex-col items-stretch justify-center text-center">
          <h1 className="text-8xl font-bold">0</h1>
          <h3 className="text-3xl text-gray-700">Skipped</h3>
        </div>
      </div>
    </div>
  )
}

const Heading = ({ value }: { value: string }) => (
  <h1 className="p-3 text-3xl font-bold">{value}</h1>
)

export default Home
