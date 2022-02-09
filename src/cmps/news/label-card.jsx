

export function LabelCard({label,getLabelCount}) {

  const setLabel = () => {
    switch (label) {
        case 'Coronavirus':
            return 'Covid19'
        case 'Health':
            return 'General Health'
    }

  }


  return <div className="label-card flex">
           <p>{ label === 'Coronavirus' || label ===  'Health' ?  setLabel() : label}</p>
           <div>{getLabelCount(label)}</div>
  </div>
}