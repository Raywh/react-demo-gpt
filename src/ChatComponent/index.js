import './index.css';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import ChatList from './ChatList'

import { useState } from 'react';

export default function Chat () {
	const [apiKey, setApiKey] = useState('');
	const [disabled, setDisabled] = useState(false);

	const [chatValue, setChatValue] = useState('');
	const [chatResult, setChatResult] = useState([
		{ id: 1, title: 'a', description: '本期节目围绕着“党的领导”，以《九万里风鹏正举》为题，通过解读习近平总书记相关重要的讲话论述当中，那些精妙的用典，来进一步领悟其中的思想要义。' },
		{ id: 2, title: 'b', description: '中大鹏鸟的典故,表达了自己也要像这只鹏鸟一样,扶摇直上,脱离自己困顿的生活,到达“蓬舟吹取三山去”的理想的生活状态。答案:运用典故,奇...' },
		{
			id: 3, title: 'c', description: `歌曲歌词
好风起
浪花急
心随梦远
山河都在眼里
这一程 天海遥遥
身旁却似有你
对故人 都不言
我来路崎岖
天接云涛连晓雾
星河欲转千帆舞
仿佛梦魂归帝所
闻天语
殷勤问我归何处
我报路长嗟日暮
学诗谩有惊人句
九万里风鹏正举
风休住
蓬舟吹取三山去
天接云涛连晓雾
星河欲转千帆舞
仿佛梦魂归帝所`},
		{ id: 1, title: 'a', description: '本期节目围绕着“党的领导”，以《九万里风鹏正举》为题，通过解读习近平总书记相关重要的讲话论述当中，那些精妙的用典，来进一步领悟其中的思想要义。' },
		{ id: 2, title: 'b', description: '中大鹏鸟的典故,表达了自己也要像这只鹏鸟一样,扶摇直上,脱离自己困顿的生活,到达“蓬舟吹取三山去”的理想的生活状态。答案:运用典故,奇...' },
		{
			id: 3, title: 'c', description: `歌曲歌词
好风起
浪花急
心随梦远
山河都在眼里
这一程 天海遥遥
身旁却似有你
对故人 都不言
我来路崎岖
天接云涛连晓雾
星河欲转千帆舞
仿佛梦魂归帝所
闻天语
殷勤问我归何处
我报路长嗟日暮
学诗谩有惊人句
九万里风鹏正举
风休住
蓬舟吹取三山去
天接云涛连晓雾
星河欲转千帆舞
仿佛梦魂归帝所`},

	]);

	async function addChat () {
		console.log('addChat')
		const prompt = chatValue; // 输入的内容
		if (prompt === "") return; // 如果没有输入内容，直接返回
		setDisabled(true); // 正在加载

		const res = await fetch("https://api.openai.com/v1/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: "gpt-3.5-turbo-1106",
				prompt,
				max_tokens: 1000,
				temperature: 0,
			}),
		});
		const response = await res.json();
		console.log(response)
		const choices = response.choices
		if (choices?.length) {
			const result = choices[0].text;
			setChatResult([...chatResult, result]);
		} else {
			const error = response?.error || {}
			const message = error?.message || '请求异常'
			console.log(message)
		}
		setDisabled(false); // 加载完成
	}

	return (
		<div className='contain'>
			<div className='ai-key-box'>
				<label>openAi key:</label>
				<Input
					value={apiKey}
					onChange={(e) => setApiKey(e.target.value)}
					placeholder="Key in here…"
				/>
			</div>

			<div className='list-box'>
				<ChatList listArr={chatResult} />
			</div>

			<div className='chat-box'>
				{/* a textarea ant a button */}
				<Textarea
					value={chatValue}
					onChange={(e) => setChatValue(e.target.value)}
					className="text"
					placeholder="Message ChatGPT…"
				/>

				<div className='start-box'>
					<IconButton disabled={disabled} variant="solid" onClick={addChat}>
						<ArrowUpwardIcon />
					</IconButton>
				</div>
			</div>
		</div>
	)
}