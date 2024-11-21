import { PlaceContacts, PlaceDetails } from "@/models/Place";
import PlaceDetailsContact from "./PlaceDetailsContact";
import { View } from "tamagui";

import {
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "@tamagui/lucide-icons";

interface Props {
  address: PlaceDetails["address"];
  contacts: PlaceContacts;
}

export default function PlaceDetailsContacts({ address, contacts }: Props) {
  return (
    <View gap="$4" paddingHorizontal="$4">
      <PlaceDetailsContact icon={<MapPin color="$color11" />} text={address} />

      {contacts.mobile
        ? contacts.mobile
            .split("; ")
            .map((m) => (
              <PlaceDetailsContact
                key={m}
                href={"tel:" + m}
                icon={<Phone color="$color11" />}
                text={m}
              />
            ))
        : null}

      {contacts.website ? (
        <PlaceDetailsContact
          icon={<Globe color="$color11" />}
          href={contacts.website}
          text={contacts.website.replace(/https?:\/\//, "").replace("/", "")}
        />
      ) : null}

      {contacts.email ? (
        <PlaceDetailsContact
          icon={<Mail color="$color11" />}
          href={"mailto:" + contacts.email}
          text={contacts.email}
        />
      ) : null}

      {contacts.instagram ? (
        <PlaceDetailsContact
          icon={<Instagram color="$color11" />}
          href={contacts.instagram}
          text={contacts.instagram}
          trimURL
        />
      ) : null}

      {contacts.twitter ? (
        <PlaceDetailsContact
          icon={<Twitter color="$color11" />}
          href={contacts.twitter}
          text={contacts.twitter}
          trimURL
        />
      ) : null}

      {contacts.facebook ? (
        <PlaceDetailsContact
          icon={<Facebook color="$color11" />}
          href={contacts.facebook}
          text={contacts.facebook}
          trimURL
        />
      ) : null}
    </View>
  );
}
