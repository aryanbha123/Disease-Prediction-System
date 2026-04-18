import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import darkModeColors from './COLORS'
const withLayout = Component => props =>
  (
    <section className='flex'>
      {/* <Sidebar /> */}
      <div className='flex flex-col'>
        <Header />
        <main style={{background:darkModeColors.surface}} className='h-full' >
          <Component {...props} />
        </main>
      </div>
      {/* <Footer /> */}
    </section>
  ) 

export default withLayout
