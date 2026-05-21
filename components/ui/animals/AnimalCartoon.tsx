import GiraffeCartoon   from './GiraffeCartoon';
import ElephantCartoon  from './ElephantCartoon';
import MonkeyCartoon    from './MonkeyCartoon';
import LionCartoon      from './LionCartoon';
import FrogCartoon      from './FrogCartoon';
import ParrotCartoon    from './ParrotCartoon';
import FishCartoon      from './FishCartoon';
import CowCartoon       from './CowCartoon';
import ButterflyCartoon from './ButterflyCartoon';
import CatCartoon       from './CatCartoon';
import RabbitCartoon    from './RabbitCartoon';
import AppleCartoon     from './AppleCartoon';
import BananaCartoon    from './BananaCartoon';
import StrawberryCartoon from './StrawberryCartoon';
import PineappleCartoon from './PineappleCartoon';
import OrangeCartoon    from './OrangeCartoon';
import WatermelonCartoon from './WatermelonCartoon';
import GrapesCartoon    from './GrapesCartoon';
import LemonCartoon     from './LemonCartoon';
import PeachCartoon     from './PeachCartoon';
import CarCartoon       from './CarCartoon';
import AirplaneCartoon  from './AirplaneCartoon';
import AmbulanceCartoon from './AmbulanceCartoon';
import MotorbikeCartoon from './MotorbikeCartoon';
import TractorCartoon   from './TractorCartoon';
import RocketCartoon    from './RocketCartoon';
import JCBCartoon         from './JCBCartoon';
import HappyFaceCartoon   from './HappyFaceCartoon';
import SillyFaceCartoon   from './SillyFaceCartoon';
import SickFaceCartoon    from './SickFaceCartoon';
import ExcitedFaceCartoon from './ExcitedFaceCartoon';
import NervousFaceCartoon from './NervousFaceCartoon';
import CoolFaceCartoon    from './CoolFaceCartoon';
import LongSnakeCartoon   from './LongSnakeCartoon';

interface Props {
  name: string;   // e.g. "Lion", "Frog", "Butterfly"
  size?: number;
}

const MAP: Record<string, (size: number) => JSX.Element> = {
  lion:      (s) => <LionCartoon      size={s} />,
  elephant:  (s) => <ElephantCartoon  size={s} />,
  monkey:    (s) => <MonkeyCartoon    size={s} />,
  giraffe:   (s) => <GiraffeCartoon   size={s} />,
  frog:      (s) => <FrogCartoon      size={s} />,
  parrot:    (s) => <ParrotCartoon    size={s} />,
  fish:      (s) => <FishCartoon      size={s} />,
  cow:       (s) => <CowCartoon       size={s} />,
  butterfly: (s) => <ButterflyCartoon size={s} />,
  cat:       (s) => <CatCartoon       size={s} />,
  rabbit:    (s) => <RabbitCartoon    size={s} />,
  apple:     (s) => <AppleCartoon     size={s} />,
  banana:    (s) => <BananaCartoon    size={s} />,
  strawberry:(s) => <StrawberryCartoon size={s} />,
  pineapple: (s) => <PineappleCartoon size={s} />,
  orange:    (s) => <OrangeCartoon    size={s} />,
  watermelon:(s) => <WatermelonCartoon size={s} />,
  grapes:    (s) => <GrapesCartoon    size={s} />,
  lemon:     (s) => <LemonCartoon     size={s} />,
  peach:     (s) => <PeachCartoon     size={s} />,
  car:       (s) => <CarCartoon       size={s} />,
  airplane:  (s) => <AirplaneCartoon  size={s} />,
  ambulance: (s) => <AmbulanceCartoon size={s} />,
  motorbike: (s) => <MotorbikeCartoon size={s} />,
  tractor:   (s) => <TractorCartoon   size={s} />,
  rocket:    (s) => <RocketCartoon    size={s} />,
  jcb:         (s) => <JCBCartoon         size={s} />,
  happyface:   (s) => <HappyFaceCartoon   size={s} />,
  sillyface:   (s) => <SillyFaceCartoon   size={s} />,
  sickface:    (s) => <SickFaceCartoon    size={s} />,
  excitedface: (s) => <ExcitedFaceCartoon size={s} />,
  nervousface: (s) => <NervousFaceCartoon size={s} />,
  coolface:    (s) => <CoolFaceCartoon    size={s} />,
  longsnake:   (s) => <LongSnakeCartoon   size={s} />,
};

export default function AnimalCartoon({ name, size = 80 }: Props) {
  const key = name.toLowerCase();
  const render = MAP[key];
  if (!render) return null;
  return render(size);
}
