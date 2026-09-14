import { ArrowUpRight, Award } from 'lucide-react';

export default function Certificates() {
  return (
    <section className="section wrap two certs" id="certyfikaty">
      <div>
        <span className="kicker">05 / Potwierdzone umiejętności</span>
        <h2>
          Rozwijam się
          <br />
          <em>nieustannie.</em>
        </h2>
        <p>Moje certyfikaty można zweryfikować bezpośrednio w serwisie Credly.</p>
      </div>
      <div className="cert-list">
        {[
          [
            '0c846bc6-178c-4a78-aa16-e5dffd25902b',
            'HashiCorp Certified: Terraform Associate (002)',
          ],
          [
            '581a21a6-c968-454d-a053-942a6204b39d',
            'Oracle Certified Associate, Java SE 8 Programmer',
          ],
        ].map(([id, name], i) => (
          <a
            key={id}
            href={`https://www.credly.com/badges/${id}?source=linked_in_profile`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="award">
              <Award />
            </span>
            <span>
              <small>Credly · certyfikat 0{i + 1}</small>
              <b>{name}</b>
            </span>
            <ArrowUpRight size={19} />
          </a>
        ))}
      </div>
    </section>
  );
}
