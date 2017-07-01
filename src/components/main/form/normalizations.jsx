
export const normalizeDate = value => {
	if (!value) { return value }

	const onlyNums = value.replace(/[^\d]/g, '')
	if (onlyNums.length <= 2) { return onlyNums }
	else {
		const minMonth = onlyNums.slice(0,2).replace(/^00/,'01')
		const month = minMonth.replace(/^[2-9][0-9]|1[3-9]$/,'12')
		const minYear = onlyNums.slice(2).replace(/^[0-1][0-8][0-9][0-9]$/,'1900')
		const year = minYear.replace(/^[2-9][1-9][0-9][0-9]|20[2-9][0-9][0-9]|201[8-9]$/,'2017')

		return `${month}/${year.slice(0,4)}`
	}
}

export const normalizeTwitter = value => {
	if (!value) { return value }

	const twitterHandle = value.slice(0,1).match(/^@/) ? value : '@'+value
	return twitterHandle.replace(' ','')
	
}

//WIP: CANNOT ACCESS OTHER FIELD FORM VALUES IN NORMALIZATION FUNCTIONS
export const disableEndDate = otherField => (value, previousValue, allValues) => {
  return (allValues[otherField] ? '12/2006' : value)
}
