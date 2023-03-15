const About = ({about}) => 
{if (!about){
	return <div>
	  Loading...  </div>
  }
	
	return (
	
	<main role="main">
		<div>
			<h1>{about.page_title}</h1>
			<p>
				{about.page_content}
			</p>
			
		</div>
	</main>
)};

export default About;
