import React from 'react';
import Clause from './components/Clause'

const parseJsonData = (data, level = 0) => {
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
			case 'clause':
				return <Clause key={index} item={item} level={level} parseJsonData={parseJsonData} style={style} />;
			case 'mention':
				return (
					<span key={index} className='mention' style={{ backgroundColor: item.color }}>
						{parseJsonData(item.children, level)}
					</span>
				);
			case 'block':
				return <div key={index}>{parseJsonData(item.children, level)}</div>;
			case 'h1':
				return <h1 key={index} style={style}>{parseJsonData(item.children, level)}</h1>;
			case 'h4':
				return <h4 key={index} style={{ ...style, display: 'inline' }}>{parseJsonData(item.children, level)}</h4>;
			case 'ul':
				return <ul key={index} style={style}>{parseJsonData(item.children, level)}</ul>;
			case 'li':
				return <li key={index} style={style}>{parseJsonData(item.children, level)}</li>;
			case 'lic':
				return <div key={index} style={style}>{parseJsonData(item.children, level)}</div>;
			case 'p':
				return item.children ?
					<div key={index} style={{ ...style, display: 'inline' }}>{parseJsonData(item.children, level)}</div> :
					<p key={index} style={{ ...style, display: 'inline' }}>{item.text}</p>;
			default:
				return (
					<span key={index}>
						{item.text ? renderTextWithLineBreaks(item.text, style) : parseJsonData(item.children, level)}
					</span>
				);
		}
	});
};

export default parseJsonData;
