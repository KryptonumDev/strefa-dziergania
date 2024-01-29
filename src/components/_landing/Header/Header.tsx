import { draftMode } from 'next/headers';
import sanityFetch from '@/utils/sanity.fetch';
import styles from './Header.module.scss';
import { Facebook, Instagram, Youtube } from '@/components/ui/Icons';
import Link from 'next/link';
import type { QueryProps } from './Header.types';

const Nav = async () => {
  const { facebook, instagram, youtube }: QueryProps = await query();

  const socials = [
    {
      name: 'Facebook',
      url: facebook,
      icon: <Facebook />,
    },
    {
      name: 'Instagram',
      url: instagram,
      icon: <Instagram />,
    },
    {
      name: 'YouTube',
      url: youtube,
      icon: <Youtube />,
    },
  ];

  return (
    <nav className={styles['Header']}>
      <div className='max-width'>
        <Link
          href='/'
          aria-label='Strona główna'
        >
          <Logo role='img' />
        </Link>
        <ul>
          {socials.map((social, i) => (
            <li key={i}>
              <a
                href={social.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={social.name}
              >
                {social.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const query = async (): Promise<QueryProps> => {
  const data = await sanityFetch(/* groq */ `
    *[_id == 'global'][0] {
      facebook,
      instagram,
      youtube,
    }`,
  {},
  draftMode().isEnabled
  );
  return data as QueryProps;
};

export default Nav;

const Logo = ({ ...props }) => (
  <svg
    width='181'
    height='73'
    viewBox='0 0 181 73'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <title>Kierunek Dzierganie</title>
    <path
      d='M114.871 9.10135C114.875 9.08535 114.88 9.07165 114.885 9.05566C115.424 6.96552 115.049 5.2523 114.106 3.98679C113.685 3.42257 113.153 2.96114 112.557 2.59109V2.58652C112.52 2.56139 112.479 2.54083 112.438 2.51799C112.383 2.48601 112.328 2.45403 112.271 2.42433C111.365 1.90808 110.467 1.52432 109.587 1.25705C108.758 0.779634 107.767 0.414145 106.602 0.197137C104.126 -0.266576 102.268 0.117187 100.948 1.04004C99.6917 1.91722 98.9676 3.24668 98.6295 4.67437C98.6113 4.69949 98.5907 4.72462 98.5702 4.74975C97.2338 6.56349 96.5828 8.79068 96.9414 10.9311C96.9529 10.995 96.9666 11.0613 96.9803 11.1252C93.5104 12.5255 87.5073 14.0309 80.8805 13.992C82.0821 13.638 83.6285 13.0029 84.307 11.9522C84.6382 11.4405 84.7273 10.89 84.572 10.3143C84.3961 9.65871 84.0237 9.46683 83.7428 9.41886C82.2465 9.16987 79.7087 12.7288 78.9663 13.8276C78.9434 13.8618 78.9297 13.8984 78.9206 13.9349C73.717 13.6608 68.2506 12.3679 63.4011 9.2978C63.2412 9.19729 63.0287 9.24297 62.9282 9.40287C62.8277 9.56277 62.8734 9.77521 63.0333 9.87572C64.8973 11.0567 66.8481 11.9773 68.8423 12.6854C68.8423 12.7265 68.8423 12.7654 68.856 12.8065C69.2534 14.072 70.6651 18.2111 72.1682 18.4007C72.2048 18.4053 72.2436 18.4076 72.2824 18.4076C72.5565 18.4076 72.9083 18.2842 73.219 17.7794C73.5319 17.2723 73.605 16.7195 73.4337 16.1347C73.1116 15.0268 71.9786 14.0423 70.9804 13.3593C74.3703 14.3004 77.8287 14.6728 81.1249 14.6728C87.7083 14.6728 93.6521 13.1902 97.1447 11.7945C97.6953 13.6174 99.027 15.2964 101.293 16.5116C105.01 18.5035 108.219 18.2043 110.595 17.069C112.936 15.952 114.476 14.0194 114.873 12.7037V12.6923L114.878 12.6877C115.204 11.742 115.321 10.4102 114.869 9.10135H114.871ZM83.5692 10.0859C83.5897 10.0859 83.6103 10.0859 83.6308 10.0904C83.7519 10.111 83.8456 10.2435 83.9118 10.4879C84.0146 10.874 83.9575 11.228 83.7313 11.5752C83.094 12.5598 81.3557 13.1948 80.0216 13.51C81.4676 11.5159 82.9364 10.0859 83.5692 10.0859ZM72.7758 16.322C72.89 16.7172 72.8444 17.0758 72.6365 17.4139C72.504 17.6286 72.3761 17.7292 72.2527 17.7132C71.6542 17.6378 70.6172 15.8035 69.7788 13.4027C70.9667 14.088 72.4492 15.1959 72.7758 16.322ZM111.94 3.00683C111.995 3.03652 112.048 3.06622 112.102 3.0982C112.676 3.43628 113.176 3.86573 113.564 4.38655C114.254 5.31169 114.613 6.54521 114.391 8.08255C114.291 7.92036 114.183 7.75818 114.062 7.60056C113.763 7.21451 113.391 6.85359 112.948 6.52465C112.84 5.36423 112.477 4.24035 111.803 3.2581C111.682 3.08449 111.552 2.91317 111.415 2.75099C111.595 2.82865 111.773 2.91317 111.942 3.00454L111.94 3.00683ZM108.089 13.9441C105.393 13.976 102.547 12.7996 101.028 11.8699C100.361 11.461 99.758 10.4856 99.3994 9.195C99.324 8.92545 99.2646 8.64677 99.2143 8.35895C99.3354 7.99574 99.5227 7.65081 99.7831 7.33786C100.258 6.76222 100.996 6.26196 102.063 5.91474C102.04 5.9787 102.017 6.04038 101.997 6.10434C101.247 8.39321 101.496 9.86887 102.374 10.7575C103.221 11.6141 104.555 11.806 105.69 11.806C108.144 11.806 109.795 10.1156 110.412 8.57595C110.716 7.81757 110.8 7.01349 110.512 6.44242C110.373 6.16602 110.145 5.95586 109.836 5.84393C110.853 6.10434 111.661 6.46526 112.299 6.89014C112.322 7.32416 112.306 7.76503 112.253 8.20818C112.004 10.3212 110.951 12.4022 109.418 13.8184C108.987 13.8961 108.543 13.9395 108.091 13.9441H108.089ZM108.402 14.6065C107.801 14.9948 107.15 15.2849 106.462 15.4517C104.959 15.8126 103.422 15.3969 102.127 14.5311C100.829 13.6654 99.8037 12.3702 99.3285 11.0339C99.2783 10.89 99.2349 10.7483 99.1961 10.6044C99.573 11.4153 100.076 12.0801 100.676 12.4478C102.262 13.4164 105.233 14.6545 108.098 14.6202C108.198 14.6202 108.301 14.6134 108.402 14.6088V14.6065ZM104.822 8.26072C104.859 8.45717 104.987 8.59423 105.126 8.68332C105.261 8.77012 105.432 8.82951 105.617 8.86835C105.8 8.90718 105.98 8.79296 106.019 8.61022C106.058 8.42748 105.944 8.24701 105.761 8.20818C105.635 8.18077 105.558 8.15107 105.512 8.12595C105.544 8.07798 105.608 8.00716 105.72 7.91808C106.191 7.54117 107.221 7.04776 108.804 6.53151C109.16 6.41501 109.409 6.41501 109.574 6.46298C109.729 6.50866 109.836 6.60232 109.909 6.74623C110.069 7.06375 110.06 7.63939 109.786 8.32468C109.247 9.67242 107.808 11.1298 105.693 11.1298C104.585 11.1298 103.502 10.9334 102.858 10.2823C102.243 9.661 101.926 8.50743 102.643 6.3145C102.714 6.09977 102.794 5.89418 102.885 5.69545C103.568 5.54697 104.356 5.45103 105.263 5.4259C106.963 5.37565 108.361 5.50814 109.512 5.76626C109.236 5.73885 108.929 5.77997 108.598 5.88962C107.008 6.40815 105.873 6.93354 105.302 7.3904C105.156 7.5069 105.032 7.63025 104.946 7.76503C104.859 7.89752 104.793 8.06884 104.829 8.26072H104.822ZM112.922 8.28813C112.957 8.00031 112.975 7.71249 112.98 7.42467C113.187 7.61655 113.37 7.81528 113.53 8.01858C113.806 8.37494 114.014 8.74956 114.165 9.13104C113.653 10.9334 112.804 12.1098 111.783 12.8453C111.444 13.0897 111.081 13.2839 110.702 13.4415C111.908 11.9864 112.703 10.1361 112.92 8.28813H112.922ZM109.994 2.32839C110.501 2.71901 110.917 3.16445 111.246 3.64415C111.744 4.36827 112.057 5.18834 112.205 6.04952C110.661 5.18834 108.42 4.66295 105.24 4.75432C104.534 4.77488 103.89 4.83655 103.301 4.93478C104.749 2.72129 107.534 1.88524 109.994 2.33068V2.32839ZM101.336 1.58828C102.399 0.845879 103.92 0.4644 106.04 0.781917C103.591 0.882427 101.437 1.8761 99.8311 3.34947C100.192 2.65276 100.683 2.04514 101.336 1.58828ZM99.244 5.02158C99.2486 5.00102 99.2532 4.98275 99.2577 4.96219C101.11 2.57738 104.288 0.980653 107.988 1.57229C105.75 1.77331 103.548 2.91546 102.41 5.11752C100.957 5.48529 99.9247 6.10891 99.2623 6.9107C99.1983 6.98837 99.1367 7.06832 99.0796 7.14827C99.0499 6.43785 99.0978 5.71373 99.2417 5.0193L99.244 5.02158ZM114.24 12.4821V12.489L114.236 12.4958C113.909 13.5946 112.52 15.4037 110.309 16.4591C108.123 17.503 105.142 17.8045 101.617 15.9154C99.1595 14.5974 97.9328 12.7402 97.6107 10.8169C97.3572 9.29551 97.6656 7.70792 98.4125 6.27566C98.3783 6.97009 98.4171 7.66223 98.5222 8.32468C98.2549 9.2681 98.3463 10.2892 98.6912 11.26C99.2189 12.7448 100.343 14.1542 101.752 15.0954C103.164 16.0365 104.891 16.5253 106.62 16.1096C107.778 15.8309 108.829 15.2415 109.729 14.4489C110.597 14.2684 111.428 13.9326 112.178 13.3913C113.121 12.7105 113.909 11.7146 114.464 10.3372C114.556 11.1344 114.444 11.8905 114.238 12.4775L114.24 12.4821Z'
      fill='#53423C'
    />
    <path
      d='M11.5716 39.5032H10.7812V50.3467H11.5716V39.5032Z'
      fill='#53423C'
    />
    <path
      d='M29.0111 45.351C29.4862 45.3007 29.9134 45.1934 30.2903 45.0289C30.6695 44.8599 30.9893 44.6474 31.2565 44.3939C31.5284 44.1335 31.734 43.8319 31.8779 43.4893C32.0218 43.1466 32.0926 42.7697 32.0926 42.354C32.0926 41.4197 31.7842 40.7116 31.1652 40.2319C30.5461 39.7476 29.6118 39.5032 28.36 39.5032H25.5938V50.3467H26.375V45.4424H27.7935C28.0037 45.4424 28.1567 45.4652 28.2527 45.5109C28.3555 45.5566 28.4491 45.6365 28.5359 45.7484L32.0081 50.148C32.0652 50.2188 32.12 50.2714 32.1771 50.3011C32.2388 50.3308 32.3096 50.3467 32.3918 50.3467H33.0748L29.3423 45.6571C29.2463 45.5292 29.1344 45.4264 29.0133 45.351H29.0111ZM28.2595 44.8599H26.375V40.1245H28.36C29.3263 40.1245 30.0618 40.3118 30.5667 40.6842C31.0715 41.0565 31.3251 41.6299 31.3251 42.4019C31.3251 42.7811 31.2565 43.1192 31.1172 43.4207C30.9801 43.7223 30.7768 43.9804 30.5119 44.1951C30.2514 44.4099 29.9294 44.5766 29.5456 44.6931C29.1664 44.805 28.7392 44.8621 28.2572 44.8621L28.2595 44.8599Z'
      fill='#53423C'
    />
    <path
      d='M2.73659 44.8895C2.65436 44.8232 2.5607 44.7753 2.45334 44.7433C2.54471 44.7067 2.62695 44.6611 2.69776 44.6062C2.77543 44.5491 2.86223 44.4715 2.95817 44.3687L7.69353 39.5031H7.05849C6.9557 39.5031 6.86889 39.5214 6.79808 39.5556C6.73184 39.5853 6.65645 39.6424 6.5765 39.7247L2.19978 44.2225C2.14267 44.2796 2.09014 44.3253 2.03988 44.3595C1.98963 44.3961 1.93252 44.4258 1.87084 44.4509C1.81374 44.4715 1.74977 44.4875 1.67896 44.4966C1.60815 44.5012 1.52363 44.5034 1.4254 44.5034H0.781231V39.4825H0V50.3421H0.781231V45.1156H1.47794C1.6013 45.1156 1.7018 45.1225 1.78404 45.1385C1.86627 45.1476 1.9348 45.1682 1.99191 45.2002C2.05359 45.2253 2.10613 45.2595 2.15181 45.3007C2.1975 45.3418 2.25004 45.3898 2.30486 45.4469L6.89631 50.1365C6.95798 50.1982 7.01737 50.2485 7.0722 50.2896C7.1293 50.3261 7.22296 50.3421 7.35545 50.3421H7.99049L2.99472 45.1316C2.90792 45.0288 2.82111 44.9489 2.73431 44.8872L2.73659 44.8895Z'
      fill='#53423C'
    />
    <path
      d='M15.6953 50.3467H22.1941V49.6957H16.4857V45.1751H21.237V44.5378H16.4857V40.1542H22.1941V39.5032H15.6953V50.3467Z'
      fill='#53423C'
    />
    <path
      d='M72.3798 45.1363C72.293 45.0336 72.2062 44.9536 72.1194 44.8919C72.0372 44.8257 71.9435 44.7777 71.8362 44.7457C71.9275 44.7092 72.0098 44.6635 72.0806 44.6087C72.156 44.5516 72.245 44.4739 72.341 44.3711L77.0763 39.5055H76.4413C76.3385 39.5055 76.2517 39.5238 76.1809 39.5581C76.1146 39.5878 76.0393 39.6449 75.9593 39.7271L71.5826 44.2249C71.5255 44.282 71.4729 44.3277 71.4227 44.362C71.3724 44.3985 71.3153 44.4282 71.2537 44.4533C71.1965 44.4739 71.1326 44.4899 71.0618 44.499C70.991 44.5036 70.9064 44.5059 70.8082 44.5059H70.164V39.485H69.3828V50.3446H70.164V45.1181H70.8608C70.9841 45.1181 71.0869 45.1249 71.1669 45.1409C71.2491 45.1501 71.3176 45.1706 71.3747 45.2026C71.4364 45.2277 71.4889 45.262 71.5346 45.3031C71.5803 45.3442 71.6328 45.3922 71.6877 45.4493L76.2791 50.139C76.3408 50.2006 76.4002 50.2509 76.455 50.292C76.5121 50.3286 76.6058 50.3446 76.7383 50.3446H77.3733L72.3752 45.1341L72.3798 45.1363Z'
      fill='#53423C'
    />
    <path
      d='M42.7612 46.2076C42.7612 46.7124 42.6836 47.1853 42.5305 47.6261C42.3821 48.0602 42.165 48.4394 41.8795 48.7592C41.594 49.0813 41.2445 49.3348 40.8287 49.5175C40.4198 49.6957 39.9538 49.7871 39.433 49.7871C38.9122 49.7871 38.4439 49.6957 38.0305 49.5107C37.6216 49.328 37.2744 49.0744 36.9888 48.7523C36.7078 48.4302 36.4908 48.0533 36.3378 47.6193C36.1893 47.1807 36.1162 46.7079 36.1162 46.2007V39.5032H35.3281V46.2099C35.3281 46.8084 35.4218 47.368 35.6114 47.8888C35.801 48.4051 36.0705 48.8574 36.4246 49.2457C36.7832 49.6295 37.215 49.931 37.7198 50.1503C38.2315 50.3696 38.8025 50.4792 39.4376 50.4792C40.0726 50.4792 40.6414 50.3696 41.1462 50.1503C41.6579 49.931 42.0897 49.6295 42.4414 49.2457C42.7978 48.8574 43.0719 48.4051 43.2615 47.8888C43.4511 47.368 43.5448 46.8084 43.5448 46.2099V39.5032H42.7635V46.2099L42.7612 46.2076Z'
      fill='#53423C'
    />
    <path
      d='M59.4766 50.3467H65.9754V49.6957H60.2669V45.1751H65.0183V44.5378H60.2669V40.1542H65.9754V39.5032H59.4766V50.3467Z'
      fill='#53423C'
    />
    <path
      d='M54.9533 48.5992C54.9533 48.7431 54.9601 48.8893 54.9761 49.0446L47.9564 39.6493C47.9108 39.5876 47.8674 39.5488 47.8262 39.5351C47.7851 39.5145 47.728 39.5054 47.6572 39.5054H47.2734V50.3489H47.9564V41.2209C47.9564 41.0815 47.9496 40.9376 47.9336 40.7846L54.9852 50.1959C55.0561 50.2987 55.152 50.3489 55.2685 50.3489H55.6431V39.5054H54.9533V48.6015V48.5992Z'
      fill='#53423C'
    />
    <path
      d='M111.522 40.3642C111.753 40.3642 111.945 40.1723 111.945 39.9416C111.945 39.8662 112.29 39.0599 112.71 38.4089C112.824 38.2558 112.749 38.0251 112.596 37.872C112.404 37.7944 112.175 37.8332 112.022 38.0251C111.792 38.37 111.141 39.519 111.141 39.9416C111.141 40.1723 111.333 40.3642 111.524 40.3642H111.522Z'
      fill='#53423C'
    />
    <path
      d='M166.384 40.3642C166.614 40.3642 166.806 40.1723 166.806 39.9416C166.806 39.8662 167.151 39.0599 167.572 38.4089C167.686 38.2558 167.61 38.0251 167.457 37.872C167.266 37.7944 167.037 37.8332 166.882 38.0251C166.651 38.37 166 39.519 166 39.9416C166 40.1723 166.192 40.3642 166.384 40.3642Z'
      fill='#53423C'
    />
    <path
      d='M180.621 43.1991C180.468 43.1214 180.237 43.1214 180.084 43.3522C177.862 46.6484 175.753 48.6015 174.49 48.6015H174.412C174.028 48.5261 173.608 48.2954 173.339 47.7586C172.994 47.2606 172.879 46.7626 172.726 46.187C173.492 45.8809 174.373 45.038 174.565 43.6194C174.718 42.6623 174.49 41.8194 173.875 41.511C173.492 41.3191 173.11 41.3968 172.765 41.7417C172.45 42.0798 172.187 42.6737 172.025 43.3864C171.868 43.6194 170.833 45.1293 169.633 46.6096C167.297 49.5609 166.568 49.6751 166.454 49.6751C166.109 49.6363 165.842 49.0629 165.764 47.9505C165.725 46.8403 165.842 45.4606 165.917 44.1562C165.917 43.8113 165.956 43.4275 165.956 43.0826C165.956 43.0803 165.956 43.078 165.956 43.0735C166.07 42.9684 166.184 42.8679 166.298 42.7742C166.49 42.6966 166.529 42.4293 166.376 42.2374C166.262 42.0844 166.031 42.0455 165.839 42.1597C164.919 42.8496 164 43.9986 163.119 45.0334C162.813 45.4172 162.543 45.7621 162.237 46.1436C161.931 46.4497 161.661 46.7946 161.394 47.0641C160.782 47.601 160.32 47.9071 159.939 47.8294C159.21 47.7517 159.174 46.2189 159.096 44.9557C158.943 43.3087 158.712 41.5841 157.524 41.5453C156.681 41.5453 155.992 42.4636 155.341 44.227C155.11 44.7639 154.957 45.3007 154.804 45.9129C154.804 44.4578 154.651 42.925 154.267 41.8125C154.153 41.5818 153.922 41.5064 153.691 41.5818C153.499 41.696 153.424 41.8514 153.461 42.0798C153.698 42.6235 153.831 43.3156 153.899 44.0534C153.71 44.3572 153.486 44.7296 153.26 45.0288C152.953 45.641 152.647 46.2167 152.264 46.8311C151.88 47.368 151.498 47.9413 151.115 48.4416C150.349 49.3987 149.543 49.8967 148.778 49.7436C147.704 49.4375 147.359 47.7517 147.359 45.6045C147.359 44.1494 147.512 42.5389 147.704 41.0062C147.743 40.8143 147.59 40.6224 147.398 40.5836C147.167 40.5447 146.975 40.6612 146.939 40.8897C146.825 41.31 146.747 41.8103 146.672 42.2694C146.213 45.0288 145.406 48.9761 144.296 49.666C144.182 49.819 144.065 49.819 143.951 49.7802C143.567 49.666 143.339 48.8984 143.339 47.7494C143.339 46.9842 143.453 45.986 143.723 44.9146C144.259 42.7674 144.949 41.8491 145.18 41.9633C145.447 42.0021 145.333 42.5389 145.333 42.5389C145.294 42.7697 145.411 42.9615 145.639 42.9981C145.831 43.0758 146.059 42.9227 146.098 42.692C146.213 42.2717 146.213 41.3511 145.37 41.1592C145.016 41.0633 144.145 41.1844 143.355 43.2973C141.728 44.5651 139.924 46.5662 138.19 48.9761V45.9106C138.19 43.3042 138.115 41.9245 137.692 41.5042C137.539 41.3899 137.425 41.3123 137.272 41.3123C136.774 41.3899 136.429 42.2328 135.892 44.1471C135.355 45.986 134.665 48.3616 133.822 48.7454C133.669 48.8231 133.555 48.8231 133.402 48.7454C133.096 48.6312 132.904 47.9025 132.904 46.8677C132.904 46.139 132.982 45.2207 133.21 44.2225C133.786 41.808 134.59 40.5813 135.013 40.5813C135.511 40.5813 135.472 41.1181 135.472 41.5773C135.472 41.808 135.664 41.9998 135.894 41.9998C136.125 41.9998 136.315 41.808 136.278 41.5773C136.164 40.0057 135.588 39.7772 135.013 39.7772C134.437 39.7772 133.902 40.314 133.402 41.1569C133.057 41.961 132.673 42.9593 132.445 44.0306C132.253 44.9512 132.061 45.9859 132.061 46.9042C132.061 48.1309 132.367 49.1269 133.096 49.433C133.441 49.586 133.825 49.586 134.206 49.433C134.782 49.1657 135.241 48.3982 135.625 47.4776C136.045 46.557 136.353 45.408 136.66 44.3367C136.851 43.6468 137.08 42.8428 137.272 42.3813C137.347 42.7651 137.347 43.4549 137.425 44.3367V48.4758C137.425 48.9738 137.347 49.5495 137.347 50.1228C136.159 51.9229 134.933 53.9924 133.822 56.2151C130.91 62.0012 129.491 67.214 129.953 70.2018C130.184 71.5816 130.835 72.5021 131.908 72.8471C132.175 72.8859 132.445 73.0001 132.712 73.0001C133.21 73.0001 133.669 72.8082 134.131 72.5021C137.886 69.8204 138.153 56.062 138.153 52.0394C138.153 51.4637 138.153 50.9292 138.192 50.3535C139.714 48.0738 141.363 46.0819 142.93 44.6816C142.925 44.6953 142.923 44.7067 142.919 44.7204C142.688 45.6776 142.574 46.79 142.574 47.7471C142.574 49.1269 142.88 50.3147 143.761 50.5454H144.029C144.296 50.5454 144.527 50.5066 144.757 50.3535C145.6 49.8167 146.213 48.284 146.596 46.5228C146.749 48.8596 147.364 50.1251 148.588 50.5089C149.698 50.7761 150.697 50.0863 151.578 49.0903C152.037 48.5923 152.46 47.9801 152.88 47.3268C153.264 46.6758 153.646 46.1002 153.954 45.4491L153.963 45.4354V45.4491C154.041 46.6758 153.963 47.9025 153.888 48.6677V49.0515C153.888 49.2822 153.888 49.5883 154.272 49.6271H154.31C154.578 49.6271 154.655 49.3964 154.77 49.1292C154.808 48.9373 154.847 48.7088 154.961 48.4393C155.192 47.4822 155.537 45.8717 156.11 44.492C156.876 42.4224 157.376 42.3082 157.49 42.3082C158.18 42.3859 158.18 43.7633 158.294 45.0288C158.294 45.4514 158.408 45.8717 158.408 46.2167C158.447 46.637 158.523 47.0207 158.676 47.3268C158.868 48.0167 159.212 48.5147 159.902 48.6289C160.515 48.7066 161.168 48.284 161.78 47.7471C162.125 47.4799 162.431 47.0961 162.701 46.7512C163.544 45.8306 164.233 44.9123 165.001 44.0306C165.053 43.9735 165.104 43.9209 165.156 43.8661C165.156 43.9598 165.156 44.0534 165.156 44.1471C165.042 45.143 165.003 46.139 165.003 47.0207C165.003 47.5187 165.003 47.9413 165.042 48.3616C165.156 49.5106 165.501 50.3535 166.383 50.4312H166.461C167.788 50.4312 170.447 46.9613 171.854 44.9626C171.854 44.9717 171.854 44.9809 171.854 44.99C171.854 46.0636 172.085 47.2126 172.658 48.1697C173.042 48.8984 173.693 49.3187 174.421 49.3187H174.499C176.836 49.3576 179.673 45.4103 180.783 43.7633C180.861 43.5714 180.822 43.3407 180.63 43.1877L180.621 43.1991ZM137.345 52.0508C137.345 60.4045 136.349 69.9848 133.667 71.8625C133.208 72.2074 132.71 72.2851 132.173 72.0932C131.444 71.8625 130.908 71.2115 130.755 70.0625C130.104 66.154 133.283 58.0676 137.345 51.6305V52.0508ZM173.341 42.2785C173.419 42.2009 173.455 42.2009 173.455 42.2009H173.494C173.686 42.2785 173.878 42.7765 173.8 43.4664C173.686 44.2316 173.263 45.038 172.651 45.3829C172.537 44.0032 172.918 42.7377 173.341 42.2785Z'
      fill='#53423C'
    />
    <path
      d='M96.0247 27.7184C93.5348 27.0674 90.4305 31.5126 88.5139 37.7191C88.5528 36.6455 88.5916 35.6495 88.5916 34.8066C88.5916 32.7759 88.4386 31.3961 87.8629 30.8205C87.671 30.6675 87.4426 30.5532 87.1731 30.5532C86.9812 30.5532 86.8281 30.784 86.867 30.9758C86.867 31.2066 87.0588 31.3984 87.2896 31.3596L87.3284 31.3984C87.6733 31.7434 87.8264 33.0454 87.8264 34.8477C87.8264 36.7643 87.6733 39.2541 87.5203 41.7075C86.7528 44.5811 85.6037 47.6855 84.9139 50.0223C84.8362 50.2142 85.0669 50.3673 85.2588 50.4449C85.4895 50.4449 85.6791 50.2919 85.6791 50.0612C85.7568 49.4101 86.9446 46.1139 87.3261 44.62C87.1342 47.2264 86.7505 52.0919 86.7139 53.5493C86.6363 53.4716 86.4832 53.4351 86.4467 53.3574C86.2159 53.282 85.9875 53.3186 85.9098 53.4716C85.7568 53.7023 85.7956 53.9308 85.9875 54.0084C86.2182 54.1615 86.4466 54.2757 86.7162 54.431C86.6774 54.8148 86.6774 55.0821 86.6774 55.274C86.7162 55.5047 86.8692 55.6577 87.0977 55.6189C87.3284 55.6189 87.4426 55.427 87.4426 55.274V54.6618C87.7875 54.7371 88.0936 54.8148 88.3632 54.8148C88.9388 54.8148 89.4368 54.6618 89.9348 54.4699C91.5452 53.8189 93.1145 52.2084 94.4942 49.8716C95.7209 47.802 96.7945 45.1591 97.4821 42.3996C98.2108 39.4871 98.5557 36.7277 98.5557 34.3909C98.5557 30.7497 97.7128 28.1456 96.027 27.723L96.0247 27.7184ZM96.7146 42.1643C95.4491 47.0687 92.845 52.5099 89.663 53.7366C88.9343 54.0039 88.2444 54.0427 87.518 53.8897C87.5568 51.8201 87.7853 48.0647 88.1302 43.6971C88.2056 43.0849 88.2444 42.4316 88.2832 41.8194C88.4363 41.2826 88.5505 40.7092 88.667 40.1724C90.4305 33.1208 93.7633 27.9491 95.8328 28.4471C97.0595 28.7532 97.7494 31.0147 97.7494 34.2333C97.7494 36.4947 97.4433 39.2541 96.7146 42.1643Z'
      fill='#53423C'
    />
    <path
      d='M130.286 43.7747C130.247 43.9277 130.4 44.1585 130.631 44.2338C130.861 44.2727 131.053 44.1562 131.09 43.9277C131.167 43.5828 131.204 43.0848 131.204 42.6257C131.204 42.0135 131.126 41.4767 130.745 41.1318C130.439 40.7868 129.941 40.7115 129.326 40.8645C127.908 41.2483 126.759 44.1607 126.3 45.5405C126.3 44.0077 126.146 42.9341 125.687 42.4361C125.534 42.1688 125.228 42.0158 124.959 41.977C124.728 41.977 124.538 42.0912 124.538 42.3219C124.499 42.5526 124.691 42.7422 124.922 42.781C124.961 42.781 124.997 42.781 125.114 42.8952C125.176 42.9798 125.24 43.1054 125.299 43.2813C125.278 43.3018 125.258 43.327 125.24 43.3567C123.017 46.6529 120.909 48.606 119.645 48.606H119.568C119.184 48.5306 118.764 48.2999 118.494 47.7631C118.149 47.2651 118.035 46.7671 117.882 46.1915C118.647 45.8854 119.529 45.0425 119.721 43.6239C119.874 42.6668 119.643 41.8239 119.031 41.5155C118.647 41.3236 118.266 41.4013 117.921 41.7462C117.605 42.0843 117.343 42.6782 117.181 43.3909C117.023 43.6239 115.988 45.1339 114.789 46.6141C112.452 49.5654 111.723 49.6796 111.609 49.6796C111.264 49.6408 110.997 49.0674 110.919 47.955C110.88 46.8448 110.997 45.4651 111.072 44.1607C111.072 43.8158 111.111 43.4321 111.111 43.0871C111.111 42.8564 110.997 42.6668 110.766 42.6668C110.574 42.6668 110.382 42.781 110.346 43.0117C110.307 43.3955 110.307 43.7793 110.307 44.1607C110.255 44.6245 110.218 45.0882 110.193 45.5405C108.459 45.4925 105.494 46.7169 101.437 49.1816C105.001 44.5445 106.956 41.7097 106.074 40.828C105.807 40.5607 105.384 40.6361 104.964 40.8668C104.733 40.9444 104.505 41.0975 104.274 41.2894C104.007 41.4813 103.737 41.7097 103.393 41.9404C102.895 42.2853 102.244 42.7445 101.707 43.1282C101.095 43.4732 100.597 43.7793 100.135 43.8181C99.9044 43.8181 99.7902 44.0488 99.7902 44.2384C99.829 44.4691 100.021 44.5833 100.249 44.5833C101.323 44.4691 102.664 43.4343 103.852 42.5526C104.427 42.1688 105.231 41.5178 105.537 41.4036C105.537 41.5955 105.384 42.2853 103.852 44.5833C102.625 46.3834 101.092 48.3776 99.9432 49.7938L99.4841 50.3695C99.3699 50.5614 99.3699 50.7532 99.4841 50.9063C99.5983 50.984 99.676 51.0205 99.7902 51.0205C99.8679 51.0205 99.9432 50.9817 100.021 50.9817C103.425 48.7887 107.872 46.2966 110.161 46.3445C110.156 46.5821 110.152 46.8128 110.152 47.0367C110.152 47.5347 110.152 47.9573 110.191 48.3776C110.305 49.5266 110.65 50.3695 111.532 50.4471H111.609C112.936 50.4471 115.595 46.9773 117.002 44.9785C117.002 44.9877 117.002 44.9968 117.002 45.0059C117.002 46.0796 117.233 47.2286 117.806 48.1857C118.19 48.9144 118.841 49.3347 119.57 49.3347H119.648C121.729 49.369 124.203 46.2463 125.505 44.3983C125.525 44.6519 125.539 44.9397 125.539 45.2732C125.539 46.4222 125.386 48.0326 125.08 50.4471V50.5248C125.002 50.7555 125.194 50.9451 125.425 50.9451C125.617 50.9451 125.808 50.7921 125.808 50.6779C126.69 45.8877 128.376 41.9404 129.525 41.5955C129.909 41.5566 130.062 41.5955 130.215 41.7097C130.482 41.977 130.599 42.6668 130.29 43.7793L130.286 43.7747ZM118.494 42.2808C118.572 42.2031 118.608 42.2031 118.608 42.2031H118.647C118.839 42.2808 119.031 42.7787 118.953 43.4686C118.839 44.2338 118.416 45.0402 117.804 45.3851C117.69 44.0054 118.071 42.7399 118.494 42.2808Z'
      fill='#53423C'
    />
  </svg>
);
