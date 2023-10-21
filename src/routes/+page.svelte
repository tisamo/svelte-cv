<script>
	import Icon from '$lib/images/imglad.png';
	import Glass from '$lib/images/3d.png';
	import {tweened} from 'svelte/motion';
	import {cubicOut} from 'svelte/easing';
	import {onMount} from "svelte";
	import ContactFrom from "../components/cube-sides/contact-form/ContactFrom.svelte";
	import Experience from "../components/cube-sides/Experience.svelte";

	const cubeStates = [
		{x: 0, y: 0},
		{x: 90, y: 0},
		{x: 270, y: 0},
		{x: 0, y: 90},
		{x: 0, y: 270},
		{x: 0, y: 180}];

	const education = [
		{
			title: "University of Pécs Faculty of Engineering and Information Technology",
			date: "September 2016 – 2017",
			description: "Bachelor's Degree\nField of study: Communication and Media Studies\n\nI was not really interested in media, but I had to figure it out."
		},
		{
			title: "Simonyi Károly High School",
			date: "September 2018 – 2019",
			description: "Software Engineer OKJ\nField of study: Programming and software development\n\nBasic programming knowledge. Simultaneously, I worked on projects with Angular and in Android Studio to learn them, as all the details are in the documentation."
		},{
			title: "Selftaught",
			date: "September 2018 – Now",
			description: "I started my web developer journey with picking angular as a popular javascript framework since then i checked and picked up many new technologies"
		}
	];
	const workExperience = [
		{
			title: "Self-employed",
			date: "2020 May – 2020 Dec",
			description: [
				"Worked with a lot of clients on many different problems.",
				"Full-stack development with Angular, Node.js",
				"Mobile development with Ionic and NativeScript.",
			],
		},
		{
			title: "Junior front-end developer at Devoralime (HU)",
			date: "2020 Dec – 2021 July",
			description: [
				"Had to build Angular web applications from a design plan.",
				"Worked with Node.js to create endpoints for my work.",
				"Had daily standups.",
			],
		},
		{
			title: "Medior front-end (Ionic 4) developer",
			date: "2021 Dec – 2022 – Feb",
			description: [
				"I worked as an entrepreneur with a small dev team",
				"Solving creative problems, had to build a lot of custom components.",
				"Building views from a specific design plan.",
				"Integrating data from APIs.",
				"Solving cross-platform problems (Android, iOS).",
			],
		},
		{
			title: "Medior front-end angular developer at Trendency",
			date: "2022 Feb – 2023 – Sept",
			description: [
				"I worked with a lot of people in a relatively big company.",
				"I have developed CMS systems and mostly news portals.",
				"Worked on also many projects simultaneously.",
				"Also filled a support role where I had to work on live projects.",
			],
		},
	];
	const contact = [
		{
			title: "Email",
			date: "kristof.krasznai95@gmail.com",
			description: 'Or just use the email form at the last page'
		},
		{
			title: "Linkedin",
			link: "https://www.linkedin.com/in/krist%C3%B3f-krasznai-07ab49167/",
		},
		{
			title: 'Github to this project',
			link: "https://github.com/tisamo/svelte-cv",
			description: '(My github includes lot of projects many of them are old as dirt and/or made for learning ' +
					'or interviews)'
		}

	];

	let currentStateIndex = 0;

	const cubeRotation = tweened({x: 0, y: 0}, {
		duration: 1000,
		easing: cubicOut
	});

	const glassRotation = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});

	const glass = tweened(0, {
		duration: 2000,
		easing: cubicOut
	});

	onMount(() => {
		addEventListener("wheel", (event) => {
			if (checkScrollDirectionIsUp(event)) {
				if (currentStateIndex === 0) return rotateCubeToSide(5);
				rotateCubeToSide(currentStateIndex - 1);
			} else {
				if (currentStateIndex === 5) return rotateCubeToSide(0);
				rotateCubeToSide(currentStateIndex + 1);
			}
		});
		setTimeout(() => {
			$glass = 160;
		}, 200)
		setTimeout(() => {
			$glassRotation = -6;
		}, 2000)
	})

	function checkScrollDirectionIsUp(event) {
		if (event.wheelDelta) {
			return event.wheelDelta > 0;
		}
		return event.deltaY < 0;
	}

	function rotateCubeToSide(stateIndex) {
		currentStateIndex = stateIndex;
		$cubeRotation = cubeStates[stateIndex];
	}
</script>

<svelte:head>
	<title>Kristóf Krasznai CV</title>
	<meta name="description" content="Krasznai Kristóf CV"/>
</svelte:head>

<div class="container">
	<div class="cube" style="transform: rotateY({$cubeRotation.y}deg) rotateX({$cubeRotation.x}deg);">
		<div class="side top">
			<div class="side-container side-container--150">
				<h1>Experience</h1>
				<Experience workplaces={workExperience}></Experience>
			</div>
		</div>
		<div class="side bottom">
			<div class="side-container side-container--150">
				<h1>About me</h1>
				<h2>Hello I'm Kristóf, </h2>
				<div class="introduction">
					<p>Over the last 3-4 years, I've worked as a software developer, primarily using Angular and Ionic. </p>
					<p>I'm currently enthusiastic about learning new technologies, having recently picked up Svelte and Flutter.</p>
					<p>I'm also familiar with backend development using Node.js and C#.</p>
					<p>I'm a quick learner, and I've noticed many similarities among these technologies.</p>
				</div>

			</div>
		</div>
		<div class="side left">
			<div class="side-container">
				<h1>Education</h1>
				<Experience workplaces={education}></Experience>
			</div>
		</div>
		<div class="side right">
			<div class="side-container">
				<h1>Contact Infos</h1>
				<Experience workplaces={contact}></Experience>
			</div>
		</div>
		<div class="side front">
			<div class="side-container ">
				<h1>Kristóf Krasznai</h1>
				<h2>Software Engineer</h2>
				<h6>(please use the mousewheel for paging)</h6>
				<img alt="myhead" class="my-big-head" src={Icon}>
				<img alt="glass" class="glass" src={Glass} style="top: {$glass}px; transform: rotate({$glassRotation}deg)">
			</div>
		</div>
		<div class="side back">
			<div class="side-container side-container--150">
				<h1>Contact</h1>
				<ContactFrom></ContactFrom>
			</div>
		</div>
	</div>
</div>


<style>
	.container {
		height: 1000px;
		width: 100%;
		perspective: 1500px;
	}

	.cube {
		margin-top: 150px;
		position: relative;
		margin-inline: auto auto;
		width: 700px;
		height: 700px;
		transform-style: preserve-3d;
	}
	.side {
		width: 700px;
		height: 700px;
		background-color: white;
		position: absolute;
		font-size: 2rem;
	}
	.front {
		transform: translateZ(350px);
	}

	.back {
		transform: translateZ(-350px) rotateY(180deg);
	}

	.left {
		transform: translateX(-350px) rotateY(-90deg);
	}

	.right {
		transform: translateX(350px) rotateY(90deg);
	}

	.top {
		transform: translateY(-350px) rotateX(90deg);
	}

	.bottom {
		transform: translateY(350px) rotateX(-90deg);
	}

	.introduction {
		display: flex;
		flex-direction: column;
		margin-top:20px;
		row-gap: 20px;
	}

	.my-big-head {
		width: 300px;
		position: absolute;
		top: 20px;
		right: 20px;
		float: right;
	}

	.glass {
		position: absolute;
		width: 160px;
		right: 110px;
	}


</style>