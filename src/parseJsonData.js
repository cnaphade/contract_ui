import React from 'react';


const parseJsonData = (data) => {
	if (!Array.isArray(data)) {
		return null;
	}

	const renderTextWithLineBreaks = (text, style) => {
		return text.split('\n').map((line, idx, array) => (
			<React.Fragment key={idx}>
				{array.length > 1 && idx < array.length - 1
					? <span style={style}>{line}<br /></span>
					: <span style={style}>{line}</span>}
			</React.Fragment>
		));
	};

	return data.map((item, index) => {
		const style = {};
		if (item.bold) {
			style.fontWeight = 'bold';
		}
		if (item.color) {
			style.color = item.color;
		}
		if (item.underline) {
			style.textDecoration = 'underline';
		}

		switch (item.type) {
			case 'block':
				return <div key={index}>{parseJsonData(item.children)}</div>;
			case 'h1':
				return <h1 key={index} style={style}>{parseJsonData(item.children)}</h1>;
			case 'p':
				return item.children ?
					<div key={index} className='paragraph'>{parseJsonData(item.children)}</div> :
					<p key={index} style={style}>{item.text}</p>;
			case 'mention':
				return (
					<span key={index} className='mention' style={{ backgroundColor: item.color }}>
						{parseJsonData(item.children)}
					</span>
				);
			case 'ul':
				return <ul key={index}>{parseJsonData(item.children)}</ul>;
			case 'li':
				return <li key={index} style={style}>{parseJsonData(item.children)}</li>;
			case 'lic':
				return <div key={index} className='custom-list-item'>{parseJsonData(item.children)}</div>;
			case 'h4':
				return <h4 key={index} style={style}>{parseJsonData(item.children)}</h4>;
			case 'clause':
				return <div key={index} className='clause'>{parseJsonData(item.children)}</div>;
			default:
				return (
					<span key={index}>
						{item.text ? renderTextWithLineBreaks(item.text, style) : parseJsonData(item.children)}
					</span>
				);
		}
	});
};

export default parseJsonData;
