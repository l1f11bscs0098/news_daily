import React, {useEffect, useState} from 'react'
import Articles from './Articles';


export default function Home(props) {

  return (
    <div>
      <Articles query = {props.query} articles = {props.articles}></Articles>
    </div>
  )
}
