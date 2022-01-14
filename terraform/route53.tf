data "aws_route53_zone" "buildo-io" {
  name = "buildo.io"
}

resource "aws_route53_record" "web_dns" {
  zone_id = data.aws_route53_zone.buildo-io.zone_id
  name    = "storybook.bento.our.buildo.io"
  type    = "CNAME"
  ttl     = "300"
  records = ["domains.chromatic.com"]
}
